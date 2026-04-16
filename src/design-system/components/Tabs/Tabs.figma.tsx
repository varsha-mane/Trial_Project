/**
 * Figma Code Connect — `HeaderTab` (MAPS file).
 * Run: npx figma connect publish (see Figma Code Connect docs).
 * 
 * NOTE: Code Connect mapping already exists in Figma for this node.
 * Delete the existing mapping in Figma before re-publishing.
 */
import figma from '@figma/code-connect/react'
import { HeaderTab } from './Tabs'

figma.connect(
  HeaderTab,
  'https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=3115-4775',
  {
    props: {
      state: figma.enum('State', {
        Selected: 'Selected',
        Rest: 'Rest',
        Hover: 'Hover',
        Disabled: 'Disabled',
      }),
    },
    example: ({ state }) => {
      const disabled = state === 'Disabled'
      const displayState = disabled ? 'Rest' : (state as 'Selected' | 'Rest' | 'Hover')
      return <HeaderTab state={displayState} text="MAPS" disabled={disabled} />
    },
  },
)


