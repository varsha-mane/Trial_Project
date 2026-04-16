/**
 * Figma Code Connect — MAPS UploadFile (`3094:5943`).
 * @see https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=3094-5943
 *
 * Figma exposes **State** (`Rest` / `File Hover`). **Layout** (`default` = OR + Browse,
 * `minimal` = dropzone only) maps the full MAPS frame vs the compact dropzone.
 */
import figma from '@figma/code-connect/react'

import { UploadFile } from './UploadFile'

figma.connect(
  UploadFile,
  'https://www.figma.com/design/VuFjMLBDrFeYhOhcqfGJtE/MAPS?node-id=3094-5943',
  {
    props: {
      state: figma.enum('State', {
        Rest: 'Rest',
        'File Hover': 'File Hover',
      }),
      layout: figma.enum('Layout', {
        default: 'default',
        minimal: 'minimal',
      }),
    },
    example: ({ state, layout }) => (
      <UploadFile state={state} layout={layout} />
    ),
  },
)
