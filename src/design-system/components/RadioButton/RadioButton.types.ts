import type { InputHTMLAttributes, ReactNode } from 'react'

export type RadioButtonSize = 'sm' | 'md'

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Controlled selected state. Omit with `defaultChecked` for uncontrolled. */
  checked?: boolean
  /** Initial selected state when uncontrolled. */
  defaultChecked?: boolean
  /** Visual scale; `md` matches Figma (20px control, 8px gap). */
  size?: RadioButtonSize
  /** Primary label next to the control (Figma **text** / **Label**). */
  label?: ReactNode
  /** Optional supporting copy under the label. */
  helperText?: ReactNode
  disabled?: boolean
}
