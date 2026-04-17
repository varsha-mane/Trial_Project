/**
 * Figma Code Connect — MAPS Radio Button (`RadioButton` component set).
 * @see https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5592
 *
 * Figma exposes **State** (Rest / Hover / Pressed / Focus / Disabled) and **Selected**;
 * hover / pressed / focus are implemented in code via CSS; only **Disabled** maps to `disabled`.
 *
 * Code Connect requires `figma.*('…')` names to match the **exact** strings in Figma’s
 * component properties (right sidebar). Checkbox uses `Label` for label text; this Radio
 * set did not expose `label` / `text` in the API — map optional label props once names match.
 */
import figma from '@figma/code-connect/react'
import { RadioButton } from './RadioButton'

figma.connect(
  RadioButton,
  'https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=2808-5592',
  {
    props: {
      // checked: figma.boolean('Selected'),
      disabled: figma.enum('State', {
        Rest: false,
        Hover: false,
        Pressed: false,
        Focus: false,
        Disabled: true,
      }),
    },
    example: ({ disabled }) => (
      <RadioButton
        // checked={checked}
        disabled={disabled}
        label="Label"
        name="figma-radio-example"
        value="a"
      />
    ),
  },
)
