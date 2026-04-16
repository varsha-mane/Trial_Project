import type { InputHTMLAttributes, ReactNode } from 'react'

export type CheckboxSize = 'sm' | 'md'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Controlled checked state. Omit with `defaultChecked` for uncontrolled. */
  checked?: boolean
  /** Initial checked state when uncontrolled. */
  defaultChecked?: boolean
  /** Shows a dash in a filled box; sets `aria-checked="mixed"`. */
  indeterminate?: boolean
  /** Uncontrolled initial indeterminate (set once on mount). */
  defaultIndeterminate?: boolean
  /** Visual scale; `md` matches Figma (20×20px box, 8px gap). */
  size?: CheckboxSize
  /** Primary label next to the control (Figma **Label** / **text**). */
  label?: ReactNode
  /** Optional supporting copy under the label (use when your spec includes it). */
  helperText?: ReactNode
  disabled?: boolean
}
