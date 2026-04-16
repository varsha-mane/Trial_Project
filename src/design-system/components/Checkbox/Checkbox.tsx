import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import type { ChangeEvent, MutableRefObject } from 'react'
import type { CheckboxProps } from './Checkbox.types'

export type { CheckboxProps, CheckboxSize } from './Checkbox.types'

function cn(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

const boxMd =
  'size-5 rounded-[4px] border-[2px] border-solid transition-[background-color,border-color,opacity] duration-150 ease-out'
const boxSm =
  'size-4 rounded-[3px] border-[2px] border-solid transition-[background-color,border-color,opacity] duration-150 ease-out'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 1H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * MAPS design-system checkbox: Figma tokens (primary #3054b1, focus #9bb2e8, disabled #7b8aa3),
 * hover/pressed halos, and `data-*` hooks for Code Connect.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      checked: checkedProp,
      defaultChecked,
      onChange,
      indeterminate = false,
      defaultIndeterminate = false,
      disabled = false,
      size = 'md',
      label,
      helperText,
      className,
      id: idProp,
      name,
      value,
      required,
      readOnly,
      ...rest
    },
    ref,
  ) {
    const autoId = useId()
    const baseId = idProp ?? `ds-checkbox-${autoId.replace(/:/g, '')}`
    const inputId = `${baseId}-input`
    const helperId = helperText ? `${baseId}-helper` : undefined

    const isControlled = checkedProp !== undefined
    const [innerChecked, setInnerChecked] = useState(Boolean(defaultChecked))
    const isChecked = isControlled ? Boolean(checkedProp) : innerChecked

    const innerRef = useRef<HTMLInputElement>(null)
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          (ref as MutableRefObject<HTMLInputElement | null>).current = node
        }
      },
      [ref],
    )

    useEffect(() => {
      const el = innerRef.current
      if (!el) return
      el.indeterminate = Boolean(indeterminate)
    }, [indeterminate])

    useEffect(() => {
      const el = innerRef.current
      if (!el || !defaultIndeterminate) return
      el.indeterminate = true
    }, [defaultIndeterminate])

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInnerChecked(e.target.checked)
        onChange?.(e)
      },
      [isControlled, onChange],
    )

    const hasVisibleLabel =
      label != null && typeof label !== 'boolean'
    const rippleLg = size === 'md' ? 'size-10' : 'size-8'
    const boxClass = size === 'md' ? boxMd : boxSm
    const iconWrap =
      size === 'md' ? 'size-3' : 'size-2.5'
    const labelText =
      size === 'md'
        ? 'font-maps-sans text-maps-body tracking-maps-normal'
        : 'font-maps-sans text-maps-body tracking-maps-tight'

    const filled = isChecked || indeterminate
    const labelWeight =
      filled && !disabled ? 'font-maps-medium' : 'font-maps-regular'

    const root = (
      <span
        className={cn(
          'group/check inline-flex max-w-full gap-2 p-0',
          size === 'md' ? 'gap-2' : 'gap-1.5',
          !disabled && 'cursor-pointer',
          disabled && 'cursor-not-allowed',
          className,
        )}
        data-size={size}
        data-checked={isChecked ? 'true' : 'false'}
        data-indeterminate={indeterminate ? 'true' : 'false'}
        data-disabled={disabled ? 'true' : 'false'}
      >
        <span className="relative inline-flex shrink-0 items-center justify-center">
          {/* Hover / pressed halo — Figma secondary-hover / secondary-pressed */}
          <span
            className={cn(
              'pointer-events-none absolute rounded-full bg-[#e6ebfa] opacity-0 transition-[opacity,background-color] duration-150 ease-out',
              rippleLg,
              'group-hover/check:opacity-100 group-active/check:bg-[#c7d3f3] group-has-[:disabled]/check:opacity-0',
            )}
            aria-hidden
          />
          <input
            ref={setRefs}
            id={inputId}
            type="checkbox"
            name={name}
            value={value}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            checked={isControlled ? checkedProp : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            onChange={handleChange}
            className={cn(
              'peer absolute inset-0 z-10 h-full w-full cursor-inherit opacity-0',
              disabled && 'cursor-not-allowed',
            )}
            aria-checked={indeterminate ? 'mixed' : undefined}
            aria-describedby={helperId}
            data-state={
              disabled
                ? 'Disabled'
                : indeterminate || isChecked
                  ? 'selected'
                  : 'rest'
            }
            {...rest}
          />
          {/* Focus ring — Figma focus-border #9bb2e8, rad-sm 6px */}
          <span
            className={cn(
              'pointer-events-none absolute inset-[-2px] rounded-md border-[2px] border-transparent opacity-0 transition-opacity duration-150 ease-out',
              'peer-focus-visible:opacity-100 peer-focus-visible:border-[#9bb2e8]',
              'peer-disabled:opacity-0',
            )}
            aria-hidden
          />
          <span
            className={cn(
              'relative z-[1] box-border flex shrink-0 items-center justify-center text-white',
              boxClass,
              !filled &&
                !disabled &&
                'border-[#3054b1] bg-transparent peer-active:opacity-90',
              filled &&
                !disabled &&
                'border-transparent bg-[#3054b1]',
              !filled &&
                disabled &&
                'border-[#7b8aa3] bg-transparent',
              filled &&
                disabled &&
                'border-transparent bg-[#7b8aa3]',
            )}
            data-name="Checkbox"
          >
            <span
              className={cn(
                'flex items-center justify-center text-current',
                iconWrap,
              )}
            >
              {indeterminate ? (
                <IndeterminateIcon className="h-[2px] w-3 max-w-full" />
              ) : isChecked ? (
                <CheckIcon className="h-3 w-3 max-w-full" />
              ) : null}
            </span>
          </span>
        </span>

        {hasVisibleLabel ? (
          <span className="flex min-w-0 flex-1 flex-col gap-1 text-left">
            <span
              className={cn(
                'text-maps-text-primary',
                labelText,
                labelWeight,
                disabled && 'text-maps-text-muted',
              )}
            >
              {label}
            </span>
            {helperText ? (
              <span
                id={helperId}
                className={cn(
                  'font-maps-sans text-maps-body font-maps-regular text-maps-text-secondary',
                  size === 'md' ? 'tracking-maps-normal' : 'tracking-maps-tight',
                )}
              >
                {helperText}
              </span>
            ) : null}
          </span>
        ) : helperText ? (
          <span
            id={helperId}
            className={cn(
              'text-left font-maps-sans text-maps-body font-maps-regular text-maps-text-secondary',
              size === 'md' ? 'tracking-maps-normal' : 'tracking-maps-tight',
            )}
          >
            {helperText}
          </span>
        ) : null}
      </span>
    )

    if (hasVisibleLabel || helperText) {
      return (
        <label
          htmlFor={inputId}
          className={cn(
            'inline-flex max-w-full',
            disabled && 'pointer-events-none',
          )}
        >
          {root}
        </label>
      )
    }

    return root
  },
)

Checkbox.displayName = 'Checkbox'
