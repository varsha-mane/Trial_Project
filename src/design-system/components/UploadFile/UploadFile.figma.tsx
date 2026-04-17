/**
 * Figma Code Connect — MAPS UploadFile (`3094:5943`).
 * @see https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=3094-5943
 *
 * Figma exposes **State** (`Rest` / `File Hover`); maps 1:1 to the `state` prop.
 */
import figma from '@figma/code-connect/react'

import { UploadFile } from './UploadFile'

figma.connect(
  UploadFile,
  'https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=3094-5943',
  {
    props: {
      state: figma.enum('State', {
        // Rest: 'Rest',
        'File Hover': 'File Hover',
      }),
    },
    example: ({ state }) => <UploadFile state={state} />,
  },
)
