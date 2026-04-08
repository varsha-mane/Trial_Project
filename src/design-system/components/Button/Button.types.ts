import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Prop-driven UI state (e.g. async actions). Hover / pressed / focus use CSS pseudo-states.
 */
export type ButtonState = 'default' | 'loading'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  disabled?: boolean
  children?: ReactNode
}
