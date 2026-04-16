/**
 * Figma Code Connect — MAPS Checkbox (`Checkbox` component set).
 * @see https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5653
 *
 * Figma exposes **State** (Rest / Hover / Pressed / Focus / Disabled) and **Selected**;
 * hover / pressed / focus are implemented in code via CSS; only **Disabled** maps to `disabled`.
 */
import figma from '@figma/code-connect/react'
import { Checkbox } from './Checkbox'

figma.connect(
  Checkbox,
  'https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5653',
  {
    props: {
      checked: figma.boolean('Selected'),
      disabled: figma.enum('State', {
        Rest: false,
        Hover: false,
        Pressed: false,
        Focus: false,
        Disabled: true,
      }),
      label: figma.string('Label'),
    },
    example: ({ checked, disabled, label }) => (
      <Checkbox
        checked={checked}
        disabled={disabled}
        label={label}
      />
    ),
  },
)
