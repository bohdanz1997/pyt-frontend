import React, { useState } from 'react'

/**
 * @typedef TabTitleProps
 * @property {*} key
 * @property {boolean} active
 * @property {function} onClick
 */

/**
 * @typedef TabContentProps
 * @property {*} key
 * @property {boolean} active
 */

/**
 * @typedef Tab
 * @property {*} key
 * @property {Object} origin
 * @property {String} title
 * @property {function(): TabTitleProps} getTitleProps
 * @property {function(): TabContentProps} getContentProps
 * @property {function(string)} render
 */

/**
 * @param items
 * @param defaultActiveKey
 * @returns {{tabs: Tab[] }}
 */
export const useTabs = (items, defaultActiveKey) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)

  const tabs = items.map((item, index) => {
    const key = item.key || index
    const Title = item.Title
    const Content = item.Content
    const active = key === activeKey

    return {
      key,
      origin: item,
      getTitleProps: () => ({
        key,
        active,
        onClick: () => setActiveKey(key),
      }),
      getContentProps: () => ({
        key,
        active,
      }),
      render(type) {
        switch (type) {
          case 'Title':
            return Title
          case 'Content':
            if (typeof Content === 'function') {
              return Content({ key, origin: item })
            }
            return Content
          default:
            return null
        }
      },
    }
  })

  return { tabs }
}
