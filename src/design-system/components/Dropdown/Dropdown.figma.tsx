/**
 * Figma Code Connect — MAPS `Dropdown` (`2808:5913`).
 * @see https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5913
 *
 * Figma: **State** (Rest / Hover / Pressed / Focus / Disabled), **Expanded**, **Filled**.
 * Only **Disabled** maps to `disabled`. **Expanded** → `isOpen`; **Filled** → show a selected value
 * via `defaultValue` / `value`. Hover, pressed, and focus rings are CSS (`hover:`, `active:`,
 * `focus-visible:`).
 */
import figma from '@figma/code-connect/react'

import { Dropdown } from './Dropdown'

const FIGMA_OPTIONS = [
  { label: 'Label', value: '1' },
  { label: 'Label', value: '2' },
  { label: 'Label', value: '3' },
] as const

figma.connect(
  Dropdown,
  'https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5913',
  {
    props: {
      disabled: figma.enum('State', {
        Rest: false,
        Hover: false,
        Pressed: false,
        Focus: false,
        Disabled: true,
      }),
      isOpen: figma.enum('Expanded', {
        True: true,
        False: false,
      }),
      filled: figma.enum('Filled', {
        True: true,
        False: false,
      }),
    },
    example: ({ disabled, isOpen, filled }) => (
      <Dropdown
        options={[...FIGMA_OPTIONS]}
        placeholder="Label"
        disabled={disabled}
        isOpen={isOpen}
        defaultValue={filled ? '1' : undefined}
      />
    ),
  },
)
