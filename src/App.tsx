import { useState } from 'react'
import {
  AppCard,
  Checkbox,
  HeaderTab,
  RadioButton,
  Tabs,
  UploadFile,
} from './design-system'
import { cn } from './design-system/utils/cn'
import './App.css'

/** MAPS typography tokens applied to the `#center` component previews */
const previewTypography = {
  sectionLabel: cn(
    'm-0 mb-2 text-left font-maps-sans text-maps-body font-maps-medium tracking-maps-tight text-maps-text-secondary',
  ),
  galleryTitle: cn(
    'm-0 mb-3 text-left font-maps-sans text-maps-heading-lg font-maps-medium text-maps-text-secondary',
  ),
  cellCaption: cn(
    'm-0 max-w-[360px] text-left font-maps-sans text-maps-ui font-maps-regular tracking-maps-tight text-maps-text-secondary',
  ),
} as const

const APP_CARD_STATUS = [
  { label: 'Assessed', Active: true },
  { label: 'Protected', Active: false },
  { label: 'Monitored', Active: true },
] as const

const APP_CARD_STATUS_FOUR = [
  { label: 'Assessed', Active: true },
  { label: 'Protected', Active: true },
  { label: 'Monitored', Active: false },
  { label: 'Compliant', Active: false },
] as const

const APP_CARD_FOOTER = {
  platform: 'iOS',
  version: '17.4.1',
  build: '21E236',
} as const

function AppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="#3054b1" strokeWidth="1.5" />
      <path
        d="M8 12h8M12 8v8"
        stroke="#3054b1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PlatformGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 1.5 15.75 5.25v7.5L9 16.5 2.25 12.75v-7.5L9 1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function App() {
  const [terms, setTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [mixChecked, setMixChecked] = useState(false)
  const [radioPlan, setRadioPlan] = useState('standard')
  const [mixIndeterminate, setMixIndeterminate] = useState(true)
  const [appCardSelected, setAppCardSelected] = useState(false)
  const [uploadDropNote, setUploadDropNote] = useState<string | null>(null)

  return (
    <>
      <section id="center">
        {/* <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div> */}
        {/* <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div> */}
        <div className="ds-checkbox-preview">
          <p className={previewTypography.sectionLabel}>Checkbox (Figma tokens)</p>
          <div className="ds-checkbox-preview__row">
            <Checkbox
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              label="Accept terms"
              helperText="Required to continue."
            />
            <Checkbox
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              label="Newsletter"
              size="sm"
            />
            <Checkbox
              defaultChecked
              readOnly
              label="Read-only checked"
            />
            <Checkbox
              checked={mixChecked}
              indeterminate={mixIndeterminate}
              onChange={(e) => {
                setMixIndeterminate(false)
                setMixChecked(e.target.checked)
              }}
              label="Indeterminate — first click resolves mixed state"
            />
            <Checkbox disabled label="Disabled" />
            <Checkbox checked disabled label="Disabled checked" />
          </div>
        </div>
        <div className="ds-radio-preview">
          <p className={previewTypography.sectionLabel}>
            RadioButton (Figma tokens)
          </p>
          <p className={previewTypography.cellCaption}>
            Controlled group — pick one option.
          </p>
          <div
            className="ds-radio-preview__row ds-radio-preview__row--inline"
            role="radiogroup"
            aria-label="Demo plan"
          >
            <RadioButton
              name="demo-plan"
              value="standard"
              checked={radioPlan === 'standard'}
              onChange={(e) => {
                if (e.target.checked) setRadioPlan(e.target.value)
              }}
              label="Standard"
            />
            <RadioButton
              name="demo-plan"
              value="priority"
              checked={radioPlan === 'priority'}
              onChange={(e) => {
                if (e.target.checked) setRadioPlan(e.target.value)
              }}
              label="Priority"
              helperText="Faster review."
            />
            <RadioButton
              name="demo-plan"
              value="locked"
              checked={radioPlan === 'locked'}
              onChange={(e) => {
                if (e.target.checked) setRadioPlan(e.target.value)
              }}
              label="Locked option"
              disabled
            />
          </div>
          <p className={previewTypography.cellCaption}>
            Uncontrolled / edge cases.
          </p>
          <div className="ds-radio-preview__row">
            <RadioButton
              name="demo-plan-solo"
              value="only"
              defaultChecked
              readOnly
              label="Read-only selected"
            />
            <RadioButton
              name="demo-size-sm"
              value="a"
              defaultChecked
              label="Small size"
              size="sm"
            />
          </div>
        </div>
        <div className="ds-tabs-preview">
          <p className={previewTypography.sectionLabel}>HeaderTab (Figma states)</p>
          <div className="ds-tabs-preview__row">
            <HeaderTab state="Rest" text="MAPS" />
            <HeaderTab state="Hover" text="MAPS" />
            <HeaderTab state="Selected" text="MAPS" />
          </div>
          <p className={previewTypography.sectionLabel}>Tabs (data-driven)</p>
          <Tabs
            aria-label="Example sections"
            defaultValue="maps"
            items={[
              {
                id: 'maps',
                text: 'MAPS',
                content: <p>Maps panel content.</p>,
              },
              {
                id: 'lists',
                text: 'LISTS',
                content: <p>Lists panel content.</p>,
              },
              {
                id: 'reports',
                text: 'REPORTS',
                content: <p>Reports panel content.</p>,
              },
            ]}
          />
        </div>

        <div className="ds-upload-preview">
          <p className={previewTypography.sectionLabel}>
            UploadFile — default layout (drag, OR, Browse Files)
          </p>
          <UploadFile
            className="mx-auto w-full"
            layout="default"
            onFileDrop={(files) =>
              setUploadDropNote(
                files.length
                  ? Array.from(files, (f) => f.name).join(', ')
                  : null,
              )
            }
          />
          {uploadDropNote ? (
            <p className="mt-2 text-left font-maps-sans text-maps-body font-maps-regular text-maps-text-secondary">
              Dropped: {uploadDropNote}
            </p>
          ) : null}
          <p className={`${previewTypography.sectionLabel} mt-6`}>
            UploadFile — minimal layout (dropzone only, 200px)
          </p>
          <UploadFile className="mx-auto w-full" layout="minimal" />
          <p className={`${previewTypography.sectionLabel} mt-6`}>
            UploadFile — pinned State · minimal (matches node 3094:5943)
          </p>
          <div className="ds-upload-preview__row">
            <UploadFile className="flex-1" layout="minimal" state="Rest" />
            <UploadFile className="flex-1" layout="minimal" state="File Hover" />
          </div>
        </div>

        <div className="ds-app-card-gallery">
          <p className={previewTypography.galleryTitle}>AppCard (all variations)</p>
          <div className="ds-app-card-gallery__grid">
            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>
                Default · Rest · Critical · findings + count · Monitored details
              </p>
              <AppCard
                type="Default"
                state="Rest"
                severity="Critical"
                findingsText="Policy violations in runtime"
                findingsCount={3}
                monitoredDetails
                monitoredDetailsText="Continuous monitoring on production workloads."
                title="Payments"
                subtitle="High-risk surface"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Warning · subtitle only</p>
              <AppCard
                type="Default"
                state="Rest"
                severity="Warning"
                findingsText="Configuration drift detected"
                findingsCount={12}
                title="Identity"
                subtitle="Review recommended"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Info</p>
              <AppCard
                type="Default"
                state="Rest"
                severity="Info"
                findingsText="Scheduled assessment in progress"
                title="Analytics"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Success</p>
              <AppCard
                type="Default"
                state="Rest"
                severity="Success"
                findingsText="No open issues"
                title="HR Portal"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>
                None · monitored-only strip (no severity banner)
              </p>
              <AppCard
                type="Default"
                state="Rest"
                severity="None"
                monitoredDetails
                monitoredDetailsText="Telemetry export enabled for this application."
                title="Internal Tools"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Compact · Critical</p>
              <AppCard
                type="Compact"
                state="Rest"
                severity="Critical"
                findingsText="Blocked dependencies"
                findingsCount={1}
                title="Supply chain"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>
                Standard (alias of default density) · severity-only row
              </p>
              <AppCard
                type="Standard"
                state="Rest"
                severity="Warning"
                findingsCount={5}
                title="Vendor API"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>State · Hover (static)</p>
              <AppCard
                type="Default"
                state="Hover"
                severity="Info"
                findingsText="New signals available"
                title="Commerce"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>State · Active (static)</p>
              <AppCard
                type="Default"
                state="Active"
                severity="Critical"
                findingsText="Immediate action required"
                findingsCount={9}
                title="Trading"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>
                Selectable · click card (not buttons) · selected=
                {appCardSelected ? 'true' : 'false'}
              </p>
              <AppCard
                type="Default"
                state="Rest"
                selectable
                selected={appCardSelected}
                severity="Warning"
                findingsText="Tap outside controls to toggle selection"
                title="Selectable demo"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onPress={() => setAppCardSelected((s) => !s)}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Selectable · selected (static)</p>
              <AppCard
                type="Default"
                state="Rest"
                selectable
                selected
                severity="Info"
                findingsText="Selected chrome"
                title="Pinned app"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                onPress={() => {}}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Disabled</p>
              <AppCard
                type="Default"
                state="Rest"
                disabled
                severity="Critical"
                findingsText="Unavailable in this context"
                title="Legacy billing"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS]}
                selectable
                onPress={() => {}}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Header action hidden · no header icon</p>
              <AppCard
                type="Default"
                state="Rest"
                severity="None"
                title="Minimal chrome"
                headerAction={null}
                platform="Android"
                version="14"
                build="UP1A.231005.007"
                statusIndicators={[...APP_CARD_STATUS]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Four status chips (wrap)</p>
              <AppCard
                type="Default"
                state="Rest"
                severity="Info"
                findingsText="Wide status matrix"
                title="Platform"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[...APP_CARD_STATUS_FOUR]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>

            <div className="ds-app-card-gallery__cell">
              <p className={previewTypography.cellCaption}>Two status chips</p>
              <AppCard
                type="Default"
                state="Rest"
                severity="Success"
                findingsText="Reduced scope"
                title="Docs"
                headerIcon={<AppIcon />}
                platformIcon={<PlatformGlyph />}
                {...APP_CARD_FOOTER}
                statusIndicators={[
                  { label: 'Assessed', Active: true },
                  { label: 'Protected', Active: true },
                ]}
                onSettingsClick={() => {}}
                onShareClick={() => {}}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        {/* <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div> */}
        {/* <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div> */}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
