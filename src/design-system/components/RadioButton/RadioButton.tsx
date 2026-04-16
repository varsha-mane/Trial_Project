import { forwardRef, useCallback, useId } from 'react'
import type { ChangeEvent, MutableRefObject } from 'react'
import type { RadioButtonProps } from './RadioButton.types'

export type { RadioButtonProps, RadioButtonSize } from './RadioButton.types'

function cn(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

const ringMd =
  'box-border rounded-full border-[2px] border-solid transition-[background-color,border-color,opacity] duration-150 ease-out'
const ringSm =
  'box-border rounded-full border-[2px] border-solid transition-[background-color,border-color,opacity] duration-150 ease-out'

/**
 * MAPS design-system radio: Figma `Radio Button` (primary #3054b1, focus #9bb2e8, disabled #7b8aa3),
 * hover/pressed halos, and `data-*` hooks for Code Connect.
 *
 * Uncontrolled groups rely on the native `name` + `checked` behavior; visuals use `peer-checked`.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  function RadioButton(
    {
      checked: checkedProp,
      defaultChecked,
      onChange,
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
    const baseId = idProp ?? `ds-radio-${autoId.replace(/:/g, '')}`
    const inputId = `${baseId}-input`
    const helperId = helperText ? `${baseId}-helper` : undefined

    const isControlled = checkedProp !== undefined

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          (ref as MutableRefObject<HTMLInputElement | null>).current = node
        }
      },
      [ref],
    )

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
      },
      [onChange],
    )

    const hasVisibleLabel =
      label != null && typeof label !== 'boolean'
    const rippleLg = size === 'md' ? 'size-10' : 'size-8'
    const ringClass = size === 'md' ? `${ringMd} size-5` : `${ringSm} size-4`
    const dotClass = size === 'md' ? 'size-2.5' : 'size-2'
    const labelText =
      size === 'md'
        ? 'font-maps-sans text-maps-body tracking-maps-normal'
        : 'font-maps-sans text-maps-body tracking-maps-tight'

    const root = (
      <span
        className={cn(
          'group/radio inline-flex max-w-full p-0',
          size === 'md' ? 'gap-2' : 'gap-1.5',
          !disabled && 'cursor-pointer',
          disabled && 'cursor-not-allowed',
          className,
        )}
        data-size={size}
        data-disabled={disabled ? 'true' : 'false'}
      >
        <span className="relative inline-flex shrink-0 items-center justify-center">
          <span
            className={cn(
              /* Figma State Circle: secondary-hover #e6ebfa, pressed #c7d3f3 */
              'pointer-events-none absolute rounded-full bg-[#e6ebfa] opacity-0 transition-[opacity,background-color] duration-150 ease-out',
              rippleLg,
              'group-hover/radio:opacity-100 group-active/radio:bg-[#c7d3f3] group-has-[:disabled]/radio:opacity-0',
            )}
            aria-hidden
          />
          <input
            ref={setRefs}
            id={inputId}
            type="radio"
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
            aria-describedby={helperId}
            data-state={disabled ? 'Disabled' : undefined}
            {...rest}
          />
          <span
            className={cn(
              'pointer-events-none absolute inset-[-2px] rounded-full border-[2px] border-transparent opacity-0 transition-opacity duration-150 ease-out',
              'peer-focus-visible:opacity-100 peer-focus-visible:border-maps-primary-200',
              'peer-disabled:opacity-0',
            )}
            aria-hidden
          />
          <span
            className={cn(
              'relative z-[1] flex shrink-0 items-center justify-center',
              ringClass,
              /* `peer-*` only reaches direct siblings; ring/dot rely on `group-has` below */
              'border-maps-primary-500 bg-transparent peer-active:opacity-90',
              'peer-disabled:border-maps-neutral-500',
              'peer-disabled:peer-checked:border-maps-neutral-500',
            )}
            data-name="Radio Button"
          >
            <span
              className={cn(
                /* Nested elements cannot use `peer-checked:` — use group-has (Figma Selected / inner dot) */
                'rounded-full opacity-0 transition-opacity duration-150 ease-out group-has-[:checked]/radio:opacity-100',
                dotClass,
                'bg-maps-primary-500 group-has-[:disabled]/radio:bg-maps-neutral-500',
              )}
              aria-hidden
            />
          </span>
        </span>

        {hasVisibleLabel ? (
          <span className="flex min-w-0 flex-1 flex-col gap-1 text-left">
            <span
              className={cn(
                'text-maps-text-primary',
                labelText,
                'font-maps-regular group-has-[:checked]/radio:font-maps-medium group-has-[:disabled]/radio:font-maps-regular',
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

RadioButton.displayName = 'RadioButton'
