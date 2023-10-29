import { produce } from 'immer'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type TQuestion } from '@/common/exam'
import { storage } from '@/common/zustand'
import { xor } from '@/utils/math'

type ExamStore = {
  exams: Record<string, TQuestion[]>
  setExam: (examId: string, questions: TQuestion[]) => void
  resetExam: (examId: string) => void
}

export const useExamStore = create<ExamStore>()(
  devtools(
    persist(
      (set) => ({
        exams: {},
        setExam: (examId, questions) =>
          set(
            produce((state: ExamStore) => {
              state.exams[examId] = questions
            }),
          ),
        resetExam: (exmaId) =>
          set(
            produce((state: ExamStore) => {
              state.exams[exmaId] = []
            }),
          ),
      }),
      { name: 'question', storage },
    ),
  ),
)

type AnswerStore = {
  answers: Record<string, Record<string, string[]>>
  toggleAnswer: ([examId, questionId, answers]: [string, string, string[]]) => void
  resetAnswer: (examId: string) => void
}

export const useAnswerStore = create<AnswerStore>()(
  devtools(
    persist(
      (set) => ({
        answers: {},
        toggleAnswer: ([examId, questionId, answers]) =>
          set(
            produce((state: AnswerStore) => {
              if (!state.answers[examId]) state.answers[examId] = {}
              if (!state.answers[examId][questionId]) state.answers[examId][questionId] = []
              state.answers[examId][questionId] = xor(state.answers[examId][questionId], answers)
            }),
          ),
        resetAnswer: (examId) =>
          set(
            produce((state: AnswerStore) => {
              state.answers[examId] = {}
            }),
          ),
      }),
      { name: 'answer', storage },
    ),
  ),
)
