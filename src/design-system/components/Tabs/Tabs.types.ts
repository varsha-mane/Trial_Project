import type { ReactNode } from 'react'

/**
 * Figma `HeaderTab` — `State` property (Selected | Rest | Hover).
 */
export type TabState = 'Selected' | 'Rest' | 'Hover'

/**
 * Figma `HeaderTab` props (naming aligned with dev mode / Code Connect).
 */
export interface HeaderTabProps {
  className?: string
  state?: TabState
  text?: string
}

export interface TabsItem {
  id: string
  /** Figma `text` / label string shown in the tab. */
  text: string
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabsItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  className?: string
  tabListClassName?: string
  tabPanelClassName?: string
  /** Accessible name for the tab list (e.g. "Main navigation"). */
  'aria-label'?: string
}
