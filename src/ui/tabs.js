import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export const Tabs = ({ tabs }) => {
  const defaultActiveTab = tabs.length ? tabs[0].key : null
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  return (
    <>
      <TabsNav>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            active={tab.key === activeTab}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.render ? tab.renderTitle() : tab.title}
          </Tab>
        ))}
      </TabsNav>
      <TabsContent>
        {tabs.map((tab) => (
          <TabPane
            key={tab.key}
            active={tab.key === activeTab}
          >
            {tab.renderContent ? tab.renderContent() : tab.content}
          </TabPane>
        ))}
      </TabsContent>
    </>
  )
}

const TabsNav = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #e8e8e8;
  outline: none;
  line-height: 15px;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const Tab = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  padding: 12px 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  ${(p) => p.active && css`
    color: #1890ff;
    font-weight: 500;
    border-bottom: 2px solid #1890ff;
  `}
`

const TabsContent = styled.div``

const TabPane = styled.div`
  display: none;
  
  ${(p) => p.active && css`
    display: block;
  `}
`
