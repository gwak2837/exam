import { Question } from '@/common/exam'
import { storage } from '@/common/zustand'
import { xor } from '@/utils/math'
import { produce } from 'immer'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type QuestionStore = {
  questions: Question[]
  setQuestions: (_: Question[]) => void
  resetQuestions: () => void
}

export const useQuestionStore = create<QuestionStore>()(
  devtools(
    persist(
      (set) => ({
        questions: [],
        setQuestions: (questions) => set(() => ({ questions })),
        resetQuestions: () => set(() => ({ questions: [] })),
      }),
      { name: 'question', storage },
    ),
  ),
)

type AnswerStore = {
  answers: Record<string, string[]>
  toggleAnswer: (_: [string, string[]]) => void
  resetAnswer: () => void
}

export const useAnswerStore = create<AnswerStore>()(
  devtools(
    persist(
      (set) => ({
        answers: {},
        toggleAnswer: (newAnswer) =>
          set(
            produce((state: AnswerStore) => {
              if (!state.answers[newAnswer[0]]) state.answers[newAnswer[0]] = []
              state.answers[newAnswer[0]] = xor(state.answers[newAnswer[0]], newAnswer[1])
            }),
          ),
        resetAnswer: () => set(() => ({ answers: {} })),
      }),
      { name: 'answer', storage },
    ),
  ),
)
