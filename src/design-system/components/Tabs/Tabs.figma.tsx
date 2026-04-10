/**
 * Figma Code Connect — `HeaderTab` (MAPS file).
 * Run: npx figma connect publish (see Figma Code Connect docs).
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
      }),
      text: figma.string('text'),
    },
    example: ({ state, text }) => (
      <HeaderTab state={state} text={text} />
    ),
  },
)
