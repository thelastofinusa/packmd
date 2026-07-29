import React from "react"
import { ActiveTab, activeTabs as tabs } from "./display"
import { Button } from "@packmd/ui/components/button"

export const ActiveTabs: React.FC<{
  tabs: typeof tabs
  activeTab: ActiveTab
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>
}> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex shrink-0 gap-px bg-card/60 p-1 sm:mb-4 sm:rounded-lg sm:border lg:hidden">
      {tabs.map((tab, index) => (
        <Button
          key={index}
          onClick={() => setActiveTab(tab.key)}
          variant={activeTab === tab.key ? "default" : "outline"}
          className="flex-1 rounded-none sm:rounded-sm"
        >
          <tab.icon className="size-3" />
          <span>{tab.label}</span>
        </Button>
      ))}
    </div>
  )
}
