import { useCallback } from 'react'

import { Tabs, UploadFile } from '../design-system'

const showcaseItemClass =
  'flex w-full flex-col gap-3 rounded-xl border border-maps-neutral-300 bg-maps-common-white p-6'

const labelClass =
  'm-0 font-maps-sans text-maps-body font-maps-medium tracking-maps-tight text-maps-text-secondary'

/**
 * MAPS onboarding — Figma `VuFjMLBDrFeYhOhcqfGJtE`, node `3909:10380` (dev).
 * Composition covers only the tab navigation and file upload blocks from that frame;
 * tab labels follow the existing MAPS `Tabs` example in this file’s design system.
 *
 * Upload sits below the tab rail (not inside a tab panel) so the file input is not
 * inside a `hidden` subtree when switching inner tabs.
 */
export function OnboardingWorkflowApp() {
  const onFileDrop = useCallback((fileList: FileList) => {
    console.log('UploadFile onFileDrop', fileList.length, 'file(s)')
  }, [])

  return (
    <div className="flex w-full flex-col gap-8 bg-maps-background-canvas p-10 font-maps-sans text-left">
      <Tabs
        aria-label="Onboarding workflow"
        className="w-full"
        defaultValue="maps"
        items={[
          { id: 'maps', text: 'MAPS', content: null },
          { id: 'lists', text: 'LISTS', content: null },
          { id: 'reports', text: 'REPORTS', content: null },
        ]}
      />

      <section
        className="flex w-full flex-col gap-8 self-stretch"
        aria-label="UploadFile Figma states (node 3094:5943)"
      >
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          <div className={showcaseItemClass}>
            <p className={labelClass}>Rest</p>
            <UploadFile
              className="w-full max-w-none self-stretch"
              state="Rest"
              onFileDrop={onFileDrop}
            />
          </div>

          <div className={showcaseItemClass}>
            <p className={labelClass}>File Hover</p>
            <UploadFile
              className="w-full max-w-none self-stretch"
              state="File Hover"
              onFileDrop={onFileDrop}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
