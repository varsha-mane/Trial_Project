/**
 * Figma Code Connect — MAPS Radio Button (`RadioButton` component set).
 * @see https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5592
 *
 * Figma exposes **State** (Rest / Hover / Pressed / Focus / Disabled) and **Selected**;
 * hover / pressed / focus are implemented in code via CSS; only **Disabled** maps to `disabled`.
 */
import figma from '@figma/code-connect/react'
import { RadioButton } from './RadioButton'

figma.connect(
  RadioButton,
  'https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5592',
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
      showLabel: figma.boolean('label'),
      label: figma.string('text'),
    },
    example: ({ checked, disabled, showLabel, label }) => (
      <RadioButton
        checked={checked}
        disabled={disabled}
        label={showLabel ? label : undefined}
        name="figma-radio-example"
        value="a"
      />
    ),
  },
)
