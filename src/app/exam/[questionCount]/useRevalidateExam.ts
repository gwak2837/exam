import useSWRMutation from 'swr/mutation'

import { fetchPOST } from '@/util/swr'

type Props = {
  examId: string
}

export default function useRevalidateExam({ examId }: Props) {
  return useSWRMutation(`/api/question/${examId}`, fetchPOST)
}
