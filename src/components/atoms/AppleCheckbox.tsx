'use client'

import { type ChangeEventHandler, type FocusEventHandler, type Ref, forwardRef } from 'react'

import styles from './AppleCheckbox.module.css'

interface Props {
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
    <label className={`relative inline-block h-6 w-12 rounded-full bg-violet-500 text-left ${styles.label1}`}>
      <input className={`absolute opacity-0  ${styles.input1}`} type="checkbox" {...props} ref={forwardedRef} />
      <span className={`block h-full w-full rounded-full  after:h-6 after:w-6 ${styles.span1}`} />
    </label>
  )
}

// 자유담 Checkbox
