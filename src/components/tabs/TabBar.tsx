import { memo } from "react"
import { useTheme } from "../../theme"
import { useKeys } from "../../keys"
import { usePref } from "../../utils/preferences"

type Tab = {
  name: string
  description: string
}

type TabBarProps = {
  tabs: ReadonlyArray<Tab>
  activeTab: number
  onTabChange: (index: number) => void
}

// 1..9, 0, - — mirrors the <leader>+digit map in useAppKeys.
const idx = (i: number) => i < 9 ? String(i + 1) : i === 9 ? "0" : "-"

const SHORT: Record<string, string> = {
  Context: "Ctx",
  Sessions: "Sess",
  Analytics: "Usage",
  Toolsets: "Tools",
  Config: "Cfg",
  Memory: "Mem",
  Kanban: "Board",
}

const label = (name: string, compact: boolean) => compact ? (SHORT[name] ?? name) : name

export const TabBar = memo(({ tabs, activeTab, onTabChange }: TabBarProps) => {
  const theme = useTheme().theme
  const keys = useKeys()
  const compact = usePref("tabMode") === "compact"
  const hints = usePref("showHints") !== false

  return (
    <box width="100%" flexDirection="column" height={1}>
      <box flexDirection="row" overflow="hidden">
        {tabs.map((tab, i) => (
          <box
            key={i}
            onMouseDown={() => onTabChange(i)}
            paddingX={compact ? 1 : 2}
            marginRight={compact ? 0 : 1}
            flexShrink={0}
            backgroundColor={i === activeTab ? theme.backgroundElement : undefined}
          >
            <text attributes={3}>
              <span fg={theme.borderSubtle}>{idx(i)} </span>
              <span fg={i === activeTab ? theme.primary : theme.textMuted}>{label(tab.name, compact)}</span>
            </text>
          </box>
        ))}
        <box flexGrow={1} minWidth={0} />
        {hints && !compact ? (
          <box paddingX={1} flexShrink={1} minWidth={0} overflow="hidden">
            <text fg={theme.borderSubtle}>
              {`${keys.print("tab.prev")}/${keys.print("tab.next")} or ${keys.print("leader")} N`}
            </text>
          </box>
        ) : null}
      </box>
    </box>
  )
})
