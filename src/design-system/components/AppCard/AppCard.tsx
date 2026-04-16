import {
  forwardRef,
  useCallback,
  useId,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'

/**
 * Figma `App Card` (4342-21283) + variant frames (4766-71418, 71722, 72289, 73379, 74515):
 * Dev Mode spacing / radii as Tailwind literals for JIT. Tune hex values against Dev Mode if tokens shift.
 */
const APP_CARD_LAYOUT = {
  shell:
    'box-border flex w-full min-w-0 max-w-[343px] flex-col overflow-hidden rounded-[12px] border border-solid bg-[#ffffff] text-left shadow-[0px_1px_2px_rgba(16,24,40,0.06)] transition-[border-color,box-shadow,opacity] duration-200 ease-out',
  shellTypeDefault: '',
  shellTypeCompact: 'max-w-[303px] rounded-[10px]',
  shellStateRest: 'border-[#e5e4e7]',
  shellStateHover: 'border-[#c9d2e3] shadow-[0px_4px_12px_rgba(16,24,40,0.08)]',
  shellStateActive: 'border-[#3054b1] shadow-[0px_6px_16px_rgba(48,84,177,0.18)]',
  shellSelectable:
    'cursor-pointer hover:border-[#c9d2e3] hover:shadow-[0px_4px_12px_rgba(16,24,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3054b1]',
  shellDisabled: 'cursor-not-allowed opacity-[0.55]',
  header:
    'flex items-start gap-[12px] px-[16px] pb-[12px] pt-[16px] font-maps-sans',
  headerCompact:
    'flex items-start gap-[10px] px-[12px] pb-[10px] pt-[12px] font-maps-sans',
  headerBody: 'flex min-w-0 flex-1 flex-col gap-[4px]',
  title:
    'm-0 font-maps-sans text-maps-body font-maps-semibold tracking-maps-tight text-[#08060d]',
  subtitle:
    'm-0 font-maps-sans text-maps-body font-maps-regular tracking-maps-tight text-[#5a6b85]',
  headerAction:
    'ml-auto inline-flex size-[32px] shrink-0 items-center justify-center rounded-[8px] border-0 bg-transparent p-0 text-[#5a6b85] transition-[background-color,color] duration-150 ease-out hover:bg-[#f4f5f8] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3054b1]',
  severityWrap: 'px-[16px] pb-[12px]',
  severityWrapCompact: 'px-[12px] pb-[10px]',
  severityInner:
    'flex flex-col gap-[6px] rounded-[8px] border border-solid px-[12px] py-[10px] font-maps-sans text-maps-body tracking-maps-tight',
  severityInnerCompact: 'gap-[4px] rounded-[6px] px-[10px] py-[8px]',
  severityRow: 'flex flex-wrap items-center gap-[8px]',
  severityLabel: 'font-maps-semibold uppercase tracking-maps-wide',
  severityMeta: 'font-maps-medium text-[#3d4d66]',
  monitoredBlock:
    'rounded-[6px] bg-[#f4f5f8] px-[10px] py-[8px] font-maps-sans text-maps-ui font-maps-medium text-[#3d4d66]',
  statusSection: 'px-[16px] pb-[12px]',
  statusSectionCompact: 'px-[12px] pb-[10px]',
  /** Equal-width chips for any indicator count (2-up, 3-up, 4-up, etc.). */
  statusRow: 'flex flex-wrap items-stretch gap-[8px]',
  statusLi: 'min-w-0 flex-[1_1_0%]',
  statusPill:
    'inline-flex min-h-[32px] w-full min-w-0 items-center justify-center gap-[6px] rounded-[8px] border border-solid px-[10px] py-[6px] font-maps-sans text-maps-ui font-maps-medium tracking-maps-tight',
  statusPillActive:
    'border-[#3054b1] bg-[rgba(48,84,177,0.08)] text-[#1f3b8c]',
  statusPillInactive: 'border-[#e5e4e7] bg-[#ffffff] text-[#7b8aa3]',
  divider: 'h-px w-full shrink-0 bg-[#e5e4e7]',
  footer:
    'flex items-center gap-[12px] px-[16px] py-[12px] font-maps-sans',
  footerCompact:
    'flex items-center gap-[10px] px-[12px] py-[10px] font-maps-sans',
  footerMeta:
    'flex min-w-0 flex-1 flex-wrap items-center gap-x-[8px] gap-y-[4px] text-maps-ui font-maps-regular tracking-maps-tight text-[#5a6b85]',
  footerSep: 'text-[#c9d2e3]',
  footerActions: 'ml-auto flex shrink-0 items-center gap-[4px]',
  footerActionBtn:
    'inline-flex size-[32px] items-center justify-center rounded-[8px] border-0 bg-transparent p-0 text-[#5a6b85] transition-[background-color,color] duration-150 ease-out hover:bg-[#f4f5f8] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3054b1]',
} as const

const SEVERITY_STYLES = {
  Critical:
    'border-[#f5c2be] bg-[#fdeaea] text-[#9e1f16]',
  Warning:
    'border-[#f5d9a8] bg-[#fff7e6] text-[#9a6700]',
  Info: 'border-[#c7daf7] bg-[#e8f1fb] text-[#174ea6]',
  Success:
    'border-[#b7dfc6] bg-[#e6f4ea] text-[#1e7e34]',
  None: '',
} as const

/** Findings count chip: contrasts per severity banner (variant nodes differ chip treatment). */
const SEVERITY_FINDINGS_COUNT = {
  Critical:
    'border border-solid border-[#f5c2be] bg-[#ffffff] text-[#9e1f16]',
  Warning:
    'border border-solid border-[#f5d9a8] bg-[#ffffff] text-[#9a6700]',
  Info: 'border border-solid border-[#c7daf7] bg-[#ffffff] text-[#174ea6]',
  Success:
    'border border-solid border-[#b7dfc6] bg-[#ffffff] text-[#1e7e34]',
} as const

function cn(...parts: Array<string | false | undefined | null>): string {
  return parts.filter(Boolean).join(' ')
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5.25 8.25 7.1 10.1 10.75 6.45"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M14.55 11.25c.09-.37.15-.76.15-1.125s-.06-.755-.15-1.125l1.845-1.44a.675.675 0 0 0 .165-.855l-1.74-3.015a.675.675 0 0 0-.81-.3l-2.175.87a7.65 7.65 0 0 0-1.95-1.125L9.405 1.26a.675.675 0 0 0-.81-.51H5.4a.675.675 0 0 0-.81.51l-.33 2.025a7.65 7.65 0 0 0-1.95 1.125l-2.175-.87a.675.675 0 0 0-.81.3l-1.74 3.015a.675.675 0 0 0 .165.855l1.845 1.44c-.09.37-.15.76-.15 1.125s.06.755.15 1.125l-1.845 1.44a.675.675 0 0 0-.165.855l1.74 3.015a.675.675 0 0 0 .81.3l2.175-.87c.6.48 1.26.87 1.95 1.125l.33 2.025a.675.675 0 0 0 .81.51h3.195a.675.675 0 0 0 .81-.51l.33-2.025a7.65 7.65 0 0 0 1.95-1.125l2.175.87a.675.675 0 0 0 .81-.3l1.74-3.015a.675.675 0 0 0-.165-.855l-1.845-1.44Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12.75 10.5 15 8.25l-2.25-2.25M6 7.5 3.75 9.75 6 12M15 8.25H8.625M3.75 9.75h6.375"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm6 12a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  )
}

/** Figma `Type`: default density vs compact tile. */
export type AppCardType = 'Default' | 'Compact' | 'Standard'

function normalizeCardType(type: AppCardType): 'Default' | 'Compact' {
  if (type === 'Compact') return 'Compact'
  return 'Default'
}

export type AppCardState = 'Rest' | 'Hover' | 'Active'

export type AppCardSeverity = 'Critical' | 'Warning' | 'Info' | 'Success' | 'None'

export type AppCardStatusIndicator = {
  /** Figma boolean property name */
  label: string
  Active: boolean
  /** Optional Figma icon swap (e.g. Assessed vs Monitored glyphs). */
  icon?: ReactNode
  inactiveIcon?: ReactNode
}

export type AppCardProps = {
  /** Figma `Type` variant */
  type?: AppCardType
  /** Figma `State` variant (Rest / Hover / Active) */
  state?: AppCardState
  /** Figma `Selectable` */
  selectable?: boolean
  /** Figma `Severity` */
  severity?: AppCardSeverity
  /** Figma `Monitored Details` */
  monitoredDetails?: boolean
  /** Figma `Disabled` — non-interactive chrome; suppresses `onPress`. */
  disabled?: boolean
  /** Selection chrome when `selectable` (maps to selected / pressed variant in Figma). */
  selected?: boolean
  title: string
  /** Secondary line under title (present on some App Card header variants). */
  subtitle?: ReactNode
  /** Findings copy in severity row; omit when the banner is severity-only. */
  findingsText?: string
  findingsCount?: number
  monitoredDetailsText?: string
  statusIndicators: AppCardStatusIndicator[]
  platform: string
  version: string
  build: string
  headerIcon?: ReactNode
  /**
   * Header trailing control. Pass `undefined` for the default chevron button, or `null` to hide it.
   */
  headerAction?: ReactNode | null
  /** Footer icon (e.g., platform mark). */
  platformIcon?: ReactNode
  /** Replace default settings/share actions. */
  actions?: ReactNode
  onHeaderActionClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onSettingsClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onShareClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onPress?: (event: MouseEvent<HTMLElement>) => void
  className?: string
  id?: string
  'aria-label'?: string
}

function shellClassForState(state: AppCardState): string {
  switch (state) {
    case 'Hover':
      return APP_CARD_LAYOUT.shellStateHover
    case 'Active':
      return APP_CARD_LAYOUT.shellStateActive
    default:
      return APP_CARD_LAYOUT.shellStateRest
  }
}

function resolveShellState(input: {
  disabled: boolean
  selectable: boolean
  selected: boolean
  state: AppCardState
}): AppCardState {
  if (input.disabled) return 'Rest'
  if (input.selectable && input.selected) return 'Active'
  return input.state
}

function StatusIndicatorPill({ item }: { item: AppCardStatusIndicator }) {
  const active = Boolean(item.Active)
  const glyph = active
    ? (item.icon ?? <CheckCircleIcon className="shrink-0 text-[#3054b1]" />)
    : (item.inactiveIcon ?? <CircleIcon className="shrink-0 text-[#c9d2e3]" />)
  return (
    <div
      className={cn(
        APP_CARD_LAYOUT.statusPill,
        active ? APP_CARD_LAYOUT.statusPillActive : APP_CARD_LAYOUT.statusPillInactive,
      )}
      data-active={active ? 'true' : 'false'}
      aria-label={`${item.label}, ${active ? 'active' : 'inactive'}`}
    >
      <span className="inline-flex shrink-0 [&>svg]:block">{glyph}</span>
      <span className="truncate">{item.label}</span>
    </div>
  )
}

export const AppCard = forwardRef<HTMLElement, AppCardProps>(function AppCard(
  {
    type = 'Default',
    state = 'Rest',
    selectable = false,
    selected = false,
    disabled = false,
    severity = 'None',
    monitoredDetails = false,
    title,
    subtitle,
    findingsText,
    findingsCount,
    monitoredDetailsText,
    statusIndicators,
    platform,
    version,
    build,
    headerIcon,
    headerAction,
    platformIcon,
    actions,
    onHeaderActionClick,
    onSettingsClick,
    onShareClick,
    onPress,
    className,
    id: idProp,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const autoId = useId()
  const titleId = idProp ?? `app-card-title-${autoId.replace(/:/g, '')}`
  const subtitleId = `${titleId}-subtitle`
  const findingsId = `${titleId}-findings`
  const monitoredId = `${titleId}-monitored`

  const density = normalizeCardType(type)
  const isCompact = density === 'Compact'

  const showSeverity = severity !== 'None'
  const showMonitoredDetails = Boolean(monitoredDetails && monitoredDetailsText)
  const showFindingsMeta =
    Boolean(findingsText && findingsText.length > 0) || findingsCount !== undefined

  const severityDescribedBy = [
    showFindingsMeta ? findingsId : null,
    showSeverity && showMonitoredDetails ? monitoredId : null,
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedShellState = resolveShellState({
    disabled,
    selectable,
    selected,
    state,
  })

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!selectable || !onPress || disabled) return
      if (event.target !== event.currentTarget) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onPress(event as unknown as MouseEvent<HTMLElement>)
      }
    },
    [disabled, onPress, selectable],
  )

  const handleShellClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!selectable || !onPress || disabled) return
      const target = event.target as HTMLElement | null
      if (!target) return
      if (target.closest('button, a, input, textarea, select, [data-app-card-no-select]')) {
        return
      }
      onPress(event)
    },
    [disabled, onPress, selectable],
  )

  const shell = cn(
    APP_CARD_LAYOUT.shell,
    isCompact && APP_CARD_LAYOUT.shellTypeCompact,
    shellClassForState(resolvedShellState),
    selectable && !disabled && APP_CARD_LAYOUT.shellSelectable,
    disabled && APP_CARD_LAYOUT.shellDisabled,
    className,
  )

  const headerClass = isCompact ? APP_CARD_LAYOUT.headerCompact : APP_CARD_LAYOUT.header
  const severityWrapClass = isCompact
    ? APP_CARD_LAYOUT.severityWrapCompact
    : APP_CARD_LAYOUT.severityWrap
  const statusSectionClass = isCompact
    ? APP_CARD_LAYOUT.statusSectionCompact
    : APP_CARD_LAYOUT.statusSection
  const footerClass = isCompact ? APP_CARD_LAYOUT.footerCompact : APP_CARD_LAYOUT.footer

  const hasDefaultAction =
    typeof onSettingsClick === 'function' || typeof onShareClick === 'function'

  const defaultActions = hasDefaultAction ? (
    <>
      {onSettingsClick ? (
        <button
          type="button"
          className={APP_CARD_LAYOUT.footerActionBtn}
          aria-label="Open settings"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation()
            onSettingsClick(e)
          }}
        >
          <SettingsIcon />
        </button>
      ) : null}
      {onShareClick ? (
        <button
          type="button"
          className={APP_CARD_LAYOUT.footerActionBtn}
          aria-label="Share"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation()
            onShareClick(e)
          }}
        >
          <ShareIcon />
        </button>
      ) : null}
    </>
  ) : null

  const resolvedFooterActions = actions !== undefined ? actions : defaultActions

  const body = (
    <>
      <header
        className={headerClass}
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
      >
        {headerIcon ? (
          <span className="inline-flex size-[40px] shrink-0 items-center justify-center [&>svg]:size-[24px]">
            {headerIcon}
          </span>
        ) : null}
        <div className={APP_CARD_LAYOUT.headerBody}>
          <h2 id={titleId} className={APP_CARD_LAYOUT.title}>
            {title}
          </h2>
          {subtitle ? (
            <p id={subtitleId} className={APP_CARD_LAYOUT.subtitle}>
              {subtitle}
            </p>
          ) : null}
        </div>
        {headerAction !== undefined ? (
          headerAction
        ) : (
          <button
            type="button"
            className={APP_CARD_LAYOUT.headerAction}
            aria-label="Open application details"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation()
              onHeaderActionClick?.(e)
            }}
          >
            <ChevronRightIcon />
          </button>
        )}
      </header>

      {showSeverity ? (
        <section
          className={severityWrapClass}
          aria-labelledby={titleId}
          aria-describedby={severityDescribedBy || undefined}
        >
          <div
            className={cn(
              APP_CARD_LAYOUT.severityInner,
              isCompact && APP_CARD_LAYOUT.severityInnerCompact,
              SEVERITY_STYLES[severity as Exclude<AppCardSeverity, 'None'>],
            )}
          >
            <div className={APP_CARD_LAYOUT.severityRow}>
              <span className={APP_CARD_LAYOUT.severityLabel}>{severity}</span>
              {showFindingsMeta ? (
                <>
                  <span className="text-[#c9d2e3]" aria-hidden>
                    |
                  </span>
                  <span id={findingsId} className={APP_CARD_LAYOUT.severityMeta}>
                    {findingsText}
                    {findingsCount !== undefined ? (
                      <span
                        className={cn(
                          'ml-[6px] inline-flex min-w-[22px] items-center justify-center rounded-full px-[6px] py-[2px] font-maps-sans text-maps-ui font-maps-semibold tracking-maps-tight shadow-[0px_1px_2px_rgba(16,24,40,0.08)]',
                          SEVERITY_FINDINGS_COUNT[
                            severity as keyof typeof SEVERITY_FINDINGS_COUNT
                          ],
                        )}
                      >
                        {findingsCount}
                      </span>
                    ) : null}
                  </span>
                </>
              ) : null}
            </div>
            {showMonitoredDetails ? (
              <p id={monitoredId} className={APP_CARD_LAYOUT.monitoredBlock}>
                {monitoredDetailsText}
              </p>
            ) : null}
          </div>
        </section>
      ) : showMonitoredDetails ? (
        <section
          className={severityWrapClass}
          aria-labelledby={titleId}
          aria-describedby={monitoredId}
        >
          <p id={monitoredId} className={APP_CARD_LAYOUT.monitoredBlock}>
            {monitoredDetailsText}
          </p>
        </section>
      ) : null}

      <section
        className={statusSectionClass}
        aria-label="Status indicators"
      >
        <ul className={cn(APP_CARD_LAYOUT.statusRow, 'm-0 list-none p-0')}>
          {statusIndicators.map((item) => (
            <li key={item.label} className={APP_CARD_LAYOUT.statusLi}>
              <StatusIndicatorPill item={item} />
            </li>
          ))}
        </ul>
      </section>

      <div className={APP_CARD_LAYOUT.divider} role="separator" />

      <footer className={footerClass}>
        {platformIcon ? (
          <span className="inline-flex size-[28px] shrink-0 items-center justify-center text-[#5a6b85] [&>svg]:size-[18px]">
            {platformIcon}
          </span>
        ) : null}
        <div className={APP_CARD_LAYOUT.footerMeta}>
          <span className="font-maps-sans text-maps-body font-maps-semibold tracking-maps-tight text-[#3d4d66]">
            {platform}
          </span>
          <span className={APP_CARD_LAYOUT.footerSep} aria-hidden>
            ·
          </span>
          <span>{version}</span>
          <span className={APP_CARD_LAYOUT.footerSep} aria-hidden>
            ·
          </span>
          <span>{build}</span>
        </div>
        {resolvedFooterActions ? (
          <div className={APP_CARD_LAYOUT.footerActions} data-app-card-no-select="">
            {resolvedFooterActions}
          </div>
        ) : null}
      </footer>
    </>
  )

  if (selectable) {
    return (
      <article
        ref={ref as never}
        className={shell}
        tabIndex={disabled ? undefined : 0}
        aria-labelledby={titleId}
        aria-label={ariaLabel}
        aria-disabled={disabled ? true : undefined}
        data-state={resolvedShellState}
        data-type={type}
        data-selectable="true"
        data-selected={selected ? 'true' : 'false'}
        data-density={density}
        onClick={handleShellClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {body}
      </article>
    )
  }

  return (
    <article
      ref={ref as never}
      className={shell}
      aria-labelledby={titleId}
      aria-label={ariaLabel}
      aria-disabled={disabled ? true : undefined}
      data-state={resolvedShellState}
      data-type={type}
      data-selectable="false"
      data-selected={selected ? 'true' : 'false'}
      data-density={density}
      {...rest}
    >
      {body}
    </article>
  )
})

AppCard.displayName = 'AppCard'
