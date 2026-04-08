/**
 * Figma Code Connect — replace FIGMA_BUTTON_URL with your component / variant URL.
 * Run: npx figma connect publish (see Figma Code Connect docs).
 */
import figma from '@figma/code-connect/react'
import { Button } from './Button'

figma.connect(Button, 'https://www.figma.com/design/FILE_KEY/Name?node-id=NODE_ID', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
      Destructive: 'destructive',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    state: figma.enum('State', {
      Default: 'default',
      Loading: 'loading',
    }),
    disabled: figma.boolean('Disabled'),
    children: figma.string('Label'),
  },
  example: ({ variant, size, state, disabled, children }) => (
    <Button variant={variant} size={size} state={state} disabled={disabled}>
      {children}
    </Button>
  ),
})
