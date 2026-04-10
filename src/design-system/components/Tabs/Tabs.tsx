import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react'
import type { KeyboardEvent } from 'react'
import type { HeaderTabProps, TabsItem, TabsProps, TabState } from './Tabs.types'

export type { HeaderTabProps, TabsItem, TabsProps, TabState } from './Tabs.types'

const labelBase =
  'text-[20px] leading-6 tracking-[2px] uppercase whitespace-nowrap font-normal font-[family-name:Roboto,system-ui,sans-serif]'

const innerBase =
  'flex items-center justify-center px-0 py-6 shrink-0 border-b-4 border-solid transition-[border-color,color] duration-200 ease-out'

function labelClassForState(state: TabState): string {
  switch (state) {
    case 'Selected':
      return 'text-[#111]'
    case 'Hover':
      return 'text-[#3d4d66]'
    default:
      return 'text-[#5a6b85]'
  }
}

function cn(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Single tab chrome from Figma `HeaderTab` (State + text). Use inside previews or Code Connect;
 * for interactive pages prefer `Tabs` with `items`.
 */
export function HeaderTab({
  className,
  state = 'Rest',
  text = 'MAPS',
}: HeaderTabProps) {
  const outer = cn(
    'flex flex-col items-center justify-center gap-0 px-5 py-0',
    className,
  )
  const inner = cn(
    innerBase,
    state === 'Selected' ? 'border-[#3054b1]' : 'border-transparent',
  )
  const labelClass = cn(labelBase, labelClassForState(state))

  const body = (
    <div className={inner}>
      <p
        className={labelClass}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {text}
      </p>
    </div>
  )

  if (state === 'Hover') {
    return (
      <button
        type="button"
        className={cn(outer, 'cursor-pointer bg-transparent p-0 text-left')}
        data-state={state}
      >
        {body}
      </button>
    )
  }

  if (state === 'Selected') {
    return (
      <div className={outer} data-state={state}>
        {body}
      </div>
    )
  }

  return (
    <div className={outer} data-state={state}>
      {body}
    </div>
  )
}

type TabsContextValue = {
  value: string
  setValue: (id: string) => void
  baseId: string
  items: TabsItem[]
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs subcomponents must be used within <Tabs>')
  }
  return ctx
}

function TabTrigger({ item, index }: { item: TabsItem; index: number }) {
  const { value, setValue, baseId, items } = useTabsContext()
  const selected = value === item.id
  const tabId = `${baseId}-tab-${item.id}`
  const panelId = `${baseId}-panel-${item.id}`

  const moveFocus = useCallback(
    (nextId: string) => {
      setValue(nextId)
      window.requestAnimationFrame(() => {
        document.getElementById(`${baseId}-tab-${nextId}`)?.focus()
      })
    },
    [baseId, setValue],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (item.disabled) return
      const enabledIndices = items
        .map((it, i) => (!it.disabled ? i : -1))
        .filter((i) => i >= 0)
      const pos = enabledIndices.indexOf(index)
      if (pos < 0) return

      let nextPos = pos
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextPos = (pos + 1) % enabledIndices.length
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        nextPos = (pos - 1 + enabledIndices.length) % enabledIndices.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextPos = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextPos = enabledIndices.length - 1
      } else {
        return
      }
      const nextIndex = enabledIndices[nextPos]
      moveFocus(items[nextIndex].id)
    },
    [item.disabled, items, index, moveFocus],
  )

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={item.disabled}
      data-state={selected ? 'Selected' : 'Rest'}
      className={cn(
        'm-0 flex cursor-pointer flex-col items-center justify-center gap-0 border-0 bg-transparent px-5 py-0 text-left',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3054b1]',
        item.disabled && 'cursor-not-allowed opacity-50',
      )}
      onClick={() => {
        if (!item.disabled) setValue(item.id)
      }}
      onKeyDown={onKeyDown}
    >
      <span
        className={cn(
          innerBase,
          selected ? 'border-[#3054b1]' : 'border-transparent',
        )}
      >
        <span
          className={cn(
            labelBase,
            selected
              ? 'text-[#111]'
              : 'text-[#5a6b85] transition-colors duration-200 ease-out hover:text-[#3d4d66]',
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {item.text}
        </span>
      </span>
    </button>
  )
}

function TabPanel({
  item,
  hidden,
}: {
  item: TabsItem
  hidden: boolean
}) {
  const { value, baseId } = useTabsContext()
  const selected = value === item.id
  const tabId = `${baseId}-tab-${item.id}`
  const panelId = `${baseId}-panel-${item.id}`

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={hidden}
      tabIndex={selected ? 0 : -1}
      className="text-left"
    >
      {item.content}
    </div>
  )
}

/**
 * Accessible tab group: `role="tablist"` / `tab` / `tabpanel`, keyboard navigation, and Figma-aligned tab chrome.
 */
export function Tabs({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  tabListClassName,
  tabPanelClassName,
  'aria-label': ariaLabel = 'Tabs',
}: TabsProps) {
  const baseId = useId().replace(/:/g, '')
  const firstEnabled = items.find((i) => !i.disabled)?.id ?? items[0]?.id ?? ''
  const [innerValue, setInnerValue] = useState(defaultValue ?? firstEnabled)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : innerValue

  const setValue = useCallback(
    (id: string) => {
      const target = items.find((t) => t.id === id)
      if (target?.disabled) return
      if (!isControlled) setInnerValue(id)
      onValueChange?.(id)
    },
    [isControlled, items, onValueChange],
  )

  const ctx = useMemo(
    () => ({ value, setValue, baseId, items }),
    [value, setValue, baseId, items],
  )

  if (items.length === 0) {
    return null
  }

  return (
    <TabsContext.Provider value={ctx}>
      <div className={className}>
        <div
          role="tablist"
          aria-label={ariaLabel}
          className={cn('flex flex-row flex-wrap', tabListClassName)}
        >
          {items.map((item, index) => (
            <TabTrigger key={item.id} item={item} index={index} />
          ))}
        </div>
        <div className={cn('mt-4', tabPanelClassName)}>
          {items.map((item) => (
            <TabPanel
              key={item.id}
              item={item}
              hidden={value !== item.id}
            />
          ))}
        </div>
      </div>
    </TabsContext.Provider>
  )
}
