import { forwardRef } from 'react'
import type { ButtonProps } from './Button.types'
import styles from './Button.module.css'

export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonState,
} from './Button.types'

/**
 * Design-system button. Visuals are driven by CSS tokens (`--ds-btn-*`) and
 * `data-variant` / `data-size` / `data-state` for Figma parity and Code Connect.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    state = 'default',
    disabled = false,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isLoading = state === 'loading'
  const rootClass = [styles.root, className].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={rootClass}
      data-variant={variant}
      data-size={size}
      data-state={state}
      disabled={disabled}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? <span className={styles.spinner} aria-hidden /> : null}
      <span className={styles.label}>{children}</span>
    </button>
  )
})

Button.displayName = 'Button'
