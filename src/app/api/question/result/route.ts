import { exam } from '@/common/exam'

export const runtime = 'edge'

type Answers = Record<string, string[]>

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (!validate(searchParams)) return new Response(`제출한 답안 형식이 잘못됐어요: ${searchParams}`, { status: 400 })

  const answers = Array.from(searchParams.keys()).reduce<Answers>((answers, questionId) => {
    answers[questionId] = searchParams.getAll(questionId)
    return answers
  }, {})

  const { 정답개수, 상세 } = Object.entries(answers).reduce(
    ({ 정답개수, 상세 }, [문제Id, 답안]) => {
      const 문제 = exam.find((문제) => 문제.id === 문제Id)
      const 해설 = 문제?.해설 ?? ''
      const 정답 = 문제?.정답?.sort() ?? []
      const isCorrect = 정답.toString() === 답안.sort().toString()
      return {
        정답개수: isCorrect ? 정답개수 + 1 : 정답개수,
        상세: { ...상세, [문제Id]: { 답안, 정답, 해설, isCorrect } },
      }
    },
    { 정답개수: 0, 상세: {} },
  )

  return Response.json({
    문제개수: Object.keys(answers).length,
    정답개수,
    상세,
  })
}

function validate(searchParams: URLSearchParams) {
  const numericRegex = /^\d+$/

  return searchParams
    .toString()
    .split('&')
    .every((pair) => {
      const [key, value] = pair.split('=')
      return numericRegex.test(key) && numericRegex.test(value)
    })
}
