import { Question } from '@/common/exam'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

const storage = createJSONStorage(() => sessionStorage)

type QuestionState = {
  questions: Question[]
  setQuestions: (_: Question[]) => void
  resetQuestions: () => void
}

export const useQuestionStore = create<QuestionState>()(
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

type AnswerState = {
  answers: [number, number[]][]
  addAnswer: (_: [number, number[]]) => void
  resetAnswer: () => void
}

export const useAnswerStore = create<AnswerState>()(
  devtools(
    persist(
      (set) => ({
        answers: [],
        addAnswer: (newAnswer) => set((state) => ({ answers: [...state.answers, newAnswer] })),
        resetAnswer: () => set(() => ({ answers: [] })),
      }),
      { name: 'answer', storage },
    ),
  ),
)
