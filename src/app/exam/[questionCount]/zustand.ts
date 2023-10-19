import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type QuestionState = {
  questions: number[]
  setQuestions: (_: number[]) => void
}

const options = {
  name: 'qna',
  storage: createJSONStorage(() => sessionStorage),
}

export const useQuestionStore = create<QuestionState>()(
  devtools(
    persist(
      (set) => ({
        questions: [],
        setQuestions: (questions) => set(() => ({ questions })),
      }),
      options,
    ),
  ),
)

type AnswerState = {
  answers: [number, number][]
  setAnswer: (_: [number, number]) => void
  resetAnswer: () => void
}

export const useAnswerStore = create<AnswerState>()(
  devtools(
    persist(
      (set) => ({
        answers: [],
        setAnswer: (newAnswer) => set((state) => ({ answers: [...state.answers, newAnswer] })),
        resetAnswer: () => set(() => ({ answers: [] })),
      }),
      options,
    ),
  ),
)
