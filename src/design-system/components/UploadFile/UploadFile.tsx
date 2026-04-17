import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react'

import { cn } from '../../utils/cn'

/**
 * MAPS `UploadFile` — Figma node `3094:5943` (MAPS file `VuFjMLBDrFeYhOhcqfGJtE`).
 *
 * **Rest:** dashed stroke, “Drag & drop the file”, **OR**, **Browse Files** (file input).
 * **File Hover:** solid stroke, “Drop the file here”, no OR / no Browse — drop target only.
 *
 * Icon uses inline SVG (upload glyph) so the control does not depend on expiring Figma asset URLs.
 */
const robotoWdth = { fontVariationSettings: "'wdth' 100" } as const

export type UploadFileState = 'Rest' | 'File Hover'

export type UploadFileProps = {
  className?: string
  /**
   * Pins surface for Figma / Code Connect previews. When omitted, **File Hover**
   * is applied while a file drag is over the drop target. **File Hover** matches
   * Figma: no OR line, no Browse — copy shows “Drop the file here” and stroke is solid.
   */
  state?: UploadFileState
  /** Called when files are dropped or chosen via Browse. */
  onFileDrop?: (files: FileList) => void
  /** `accept` on the hidden file input. */
  accept?: string
  /** `multiple` on the hidden file input. */
  multiple?: boolean
}

function UploadGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 3.5v9M6.5 7.5 10 3.5 13.5 7.5M4 16.5h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function isFileDrag(e: DragEvent) {
  return [...(e.dataTransfer?.types ?? [])].includes('Files')
}

export function UploadFile({
  className,
  state: stateProp,
  onFileDrop,
  accept,
  multiple,
}: UploadFileProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autoId = useId()
  const inputId = `upload-file-${autoId.replace(/:/g, '')}`

  const [internalFileOver, setInternalFileOver] = useState(false)
  const dragDepth = useRef(0)

  const visualState: UploadFileState =
    stateProp ?? (internalFileOver ? 'File Hover' : 'Rest')

  const isFileHover = visualState === 'File Hover'

  const onDragEnter = useCallback(
    (e: DragEvent) => {
      if (!isFileDrag(e)) return
      e.preventDefault()
      e.stopPropagation()
      dragDepth.current += 1
      if (stateProp === undefined) setInternalFileOver(true)
    },
    [stateProp],
  )

  const onDragLeave = useCallback(
    (e: DragEvent) => {
      if (!isFileDrag(e)) return
      e.preventDefault()
      e.stopPropagation()
      dragDepth.current -= 1
      if (dragDepth.current <= 0) {
        dragDepth.current = 0
        if (stateProp === undefined) setInternalFileOver(false)
      }
    },
    [stateProp],
  )

  const onDragOver = useCallback((e: DragEvent) => {
    if (!isFileDrag(e)) return
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
  }, [])

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragDepth.current = 0
      if (stateProp === undefined) setInternalFileOver(false)
      if (e.dataTransfer?.files?.length) onFileDrop?.(e.dataTransfer.files)
    },
    [onFileDrop, stateProp],
  )

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files
      if (list?.length) onFileDrop?.(list)
      e.target.value = ''
    },
    [onFileDrop],
  )

  const openFilePicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <div
      className={cn(
        'font-maps-sans flex w-full max-w-[43.5rem] min-h-[200px] flex-col items-center justify-center gap-5 overflow-hidden rounded-xl border px-20 py-6',
        /* Rest: dashed stroke · File Hover: solid, slightly stronger stroke (Figma) */
        isFileHover
          ? 'border-solid border-maps-neutral-500 bg-maps-neutral-300/50'
          : 'border-dashed border-maps-neutral-400 bg-maps-neutral-200',
        className,
      )}
      data-state={visualState}
      data-name="UploadFile"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        className="sr-only"
        tabIndex={-1}
        accept={accept}
        multiple={multiple}
        onChange={onInputChange}
      />

      <div
        className="flex w-full flex-col items-start gap-4 p-0"
        data-name="Text Frame"
      >
        <div
          className="flex w-full flex-col items-center gap-1 p-0"
          data-name="Option 1"
        >
          <div
            className="flex size-6 shrink-0 items-center justify-center overflow-hidden p-0"
            data-name="Icon Component"
          >
            <UploadGlyph className="size-5 text-maps-neutral-700" />
          </div>
          <div
            className="shrink-0 justify-center whitespace-nowrap text-center font-maps-sans font-maps-regular text-maps-body leading-maps-normal tracking-[0.4px] text-maps-text-primary"
            style={robotoWdth}
          >
            <p className="leading-[24px]">
              {isFileHover ? 'Drop the file here' : 'Drag & drop the file'}
            </p>
          </div>
        </div>

        {visualState === 'Rest' && (
          <>
            <div
              className="w-full shrink-0 text-center font-maps-sans font-maps-regular text-sm leading-5 tracking-[0.4px] text-maps-text-primary"
              style={robotoWdth}
              data-node-id="3094:5889"
            >
              <p className="leading-[20px]">OR</p>
            </div>

            <div className="flex w-full shrink-0 justify-center">
              <button
                type="button"
                className={cn(
                  'inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-[8px] border-[1.5px] border-solid border-maps-neutral-300 bg-maps-common-white px-[16px] py-[8px] font-maps-sans text-maps-body font-maps-medium tracking-maps-tight text-maps-text-tertiary shadow-[0px_1px_2px_rgba(16,24,40,0.08)] transition-[background-color,border-color,color,box-shadow,opacity] duration-150 ease-out',
                  'hover:border-maps-primary-500 hover:bg-maps-alpha-primaryLow hover:text-maps-primary-500 hover:shadow-[0px_4px_12px_rgba(16,24,40,0.08)]',
                  'active:border-maps-primary-500 active:bg-maps-alpha-primaryMedium active:text-maps-primary-700 active:shadow-[0px_1px_2px_rgba(16,24,40,0.06)]',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maps-primary-500',
                )}
                aria-controls={inputId}
                onClick={(e) => {
                  e.stopPropagation()
                  openFilePicker()
                }}
              >
                Browse Files
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
