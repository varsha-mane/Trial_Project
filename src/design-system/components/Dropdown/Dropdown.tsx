import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react'

import { cn } from '../../utils/cn'

/**
 * MAPS `Dropdown` — Figma component set `Dropdown` (node `2808:5913`, file `VuFjMLBDrFeYhOhcqfGJtE`).
 * Properties: **State**, **Expanded**, **Filled**. Only **Disabled** maps to `disabled`; hover /
 * pressed / focus are CSS. **Expanded** ↔ `isOpen`; **Filled** ↔ a selected value (vs placeholder).
 * Parent frame `Final Components` (`3788:7877`) contains this set; Code Connect URL may point at `2808:5913`.
 */

const robotoWdth = { fontVariationSettings: "'wdth' 100" } as const

export type DropdownOption<T extends string = string> = {
  label: string
  value: T
}

export type DropdownProps<T extends string = string> = {
  options: Array<DropdownOption<T>>
  /** Selected value (controlled). */
  value?: T
  /** Initial value when uncontrolled. */
  defaultValue?: T
  onChange?: (value: T) => void
  placeholder?: string
  disabled?: boolean
  /** Open state (controlled). */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  /** Optional; not on the base Figma control — use when composing forms. */
  label?: string
  helperText?: string
  id?: string
}

function Chevron({ expanded, className }: { expanded: boolean; className?: string }) {
  return (
    <svg
      className={cn('size-5 shrink-0 text-maps-text-secondary transition-transform duration-150', expanded && 'rotate-180', className)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Dropdown<T extends string = string>({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = 'Label',
  disabled = false,
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpenChange,
  className,
  label,
  helperText,
  id: idProp,
}: DropdownProps<T>) {
  const autoId = useId()
  const baseId = idProp ?? `maps-dropdown-${autoId.replace(/:/g, '')}`
  const triggerId = `${baseId}-trigger`
  const listId = `${baseId}-listbox`
  const helperId = helperText ? `${baseId}-helper` : undefined

  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue)
  const valueControlled = valueProp !== undefined
  const selected = valueControlled ? valueProp : internalValue

  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const openControlled = isOpenProp !== undefined
  const open = openControlled ? (isOpenProp as boolean) : internalOpen

  const setOpen = useCallback(
    (next: boolean) => {
      onOpenChange?.(next)
      if (!openControlled) setInternalOpen(next)
    },
    [onOpenChange, openControlled],
  )

  const selectedIndex = useMemo(() => {
    if (selected === undefined) return -1
    return options.findIndex((o) => o.value === selected)
  }, [options, selected])

  const [highlightIndex, setHighlightIndex] = useState(0)

  const syncHighlightToSelection = useCallback(() => {
    const n = options.length
    if (n === 0) return
    const base = selectedIndex >= 0 ? selectedIndex : 0
    setHighlightIndex(Math.min(base, n - 1))
  }, [options.length, selectedIndex])

  const openMenu = useCallback(() => {
    syncHighlightToSelection()
    setOpen(true)
  }, [setOpen, syncHighlightToSelection])

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const prevIsOpenProp = useRef(isOpenProp)
  useEffect(() => {
    if (!openControlled) {
      prevIsOpenProp.current = isOpenProp
      return
    }
    const becameOpen = isOpenProp === true && prevIsOpenProp.current !== true
    prevIsOpenProp.current = isOpenProp
    if (!becameOpen) return
    const id = requestAnimationFrame(() => {
      syncHighlightToSelection()
    })
    return () => cancelAnimationFrame(id)
  }, [isOpenProp, openControlled, syncHighlightToSelection])

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocMouseDown = (e: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closeMenu()
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open, closeMenu])

  const commit = useCallback(
    (v: T) => {
      onChange?.(v)
      if (!valueControlled) setInternalValue(v)
      closeMenu()
    },
    [onChange, valueControlled, closeMenu],
  )

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return
    const n = options.length
    if (!open) {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'Enter' ||
        e.key === ' '
      ) {
        e.preventDefault()
        openMenu()
      }
      return
    }
    if (n === 0) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
      }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightIndex((i) => Math.min(i + 1, n - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightIndex((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setHighlightIndex(0)
        break
      case 'End':
        e.preventDefault()
        setHighlightIndex(n - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        {
          const opt = options[highlightIndex]
          if (opt) commit(opt.value)
        }
        break
      case 'Escape':
        e.preventDefault()
        closeMenu()
        break
      case 'Tab':
        closeMenu()
        break
      default:
        break
    }
  }

  const displayLabel =
    selectedIndex >= 0 ? options[selectedIndex]!.label : placeholder

  const filled = selectedIndex >= 0

  return (
    <div ref={rootRef} className={cn('relative w-full min-w-[12.5rem]', className)}>
      {label ? (
        <label
          htmlFor={triggerId}
          className="mb-1 block font-maps-sans text-maps-body font-maps-medium tracking-maps-tight text-maps-text-secondary"
          style={robotoWdth}
        >
          {label}
        </label>
      ) : null}
      <button
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && options[highlightIndex] ? `${baseId}-opt-${highlightIndex}` : undefined}
        aria-describedby={helperId}
        data-state={open ? 'open' : 'closed'}
        data-filled={filled ? 'true' : 'false'}
        className={cn(
          'group flex w-full items-center gap-3 rounded border border-maps-border-interactive bg-maps-background-canvas px-3 py-3 text-left font-maps-sans text-maps-body tracking-maps-wide transition-colors duration-150',
          'hover:border-maps-primary-600',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maps-border-strong',
          'active:border-maps-primary-700',
          open && 'border-maps-primary-500 shadow-[0px_1px_2px_rgba(16,24,40,0.06)]',
          disabled && 'cursor-not-allowed border-maps-border-subtle opacity-60',
          !disabled && !filled && 'text-maps-text-tertiary',
          !disabled && filled && 'text-maps-text-primary',
        )}
        style={robotoWdth}
        onClick={() => {
          if (disabled) return
          if (open) closeMenu()
          else openMenu()
        }}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="min-w-0 flex-1 truncate">{displayLabel}</span>
        <Chevron expanded={open} />
      </button>

      {open && !disabled ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={label ? triggerId : undefined}
          className="absolute left-0 right-0 top-[calc(100%+0.125rem)] z-50 max-h-60 overflow-auto rounded border border-maps-border-subtle bg-maps-background-canvas py-0 shadow-[0px_4px_12px_rgba(16,24,40,0.08)]"
        >
          {options.map((opt, index) => {
            const isSelected = opt.value === selected
            const isHighlighted = index === highlightIndex
            return (
              <li
                key={String(opt.value)}
                id={`${baseId}-opt-${index}`}
                role="option"
                aria-selected={isSelected}
                data-highlighted={isHighlighted ? 'true' : 'false'}
                className={cn(
                  'cursor-pointer px-3 py-3 font-maps-sans text-maps-body tracking-maps-wide text-maps-text-primary transition-colors duration-100',
                  'hover:bg-maps-background-muted',
                  isHighlighted && 'bg-maps-background-primaryTint',
                  isSelected && 'font-maps-medium',
                )}
                style={robotoWdth}
                onMouseEnter={() => setHighlightIndex(index)}
                onMouseDown={(e: ReactMouseEvent) => e.preventDefault()}
                onClick={() => commit(opt.value)}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      ) : null}

      {helperText ? (
        <p id={helperId} className="mt-1 font-maps-sans text-maps-ui font-maps-regular text-maps-text-muted" style={robotoWdth}>
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
