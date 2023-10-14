'use client'

import { ChangeEventHandler, FocusEventHandler, Ref, forwardRef } from 'react'

import styles from './AppleCheckbox.module.css'

type Props = {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  name?: string
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  ref: Ref<HTMLInputElement>
}

export default forwardRef(AppleCheckbox)

function AppleCheckbox(props: Props, forwardedRef: Ref<HTMLInputElement>) {
  return (
    <label className={`w-12 h-6 text-left rounded-full inline-block relative bg-violet-500 ${styles.label1}`}>
      <input className={`opacity-0 absolute  ${styles.input1}`} type="checkbox" {...props} ref={forwardedRef} />
      <span className={`block w-full h-full rounded-full  after:w-6 after:h-6 ${styles.span1}`} />
    </label>
  )
}

// 자유담 Checkbox
