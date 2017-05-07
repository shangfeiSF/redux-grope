import React from 'react'

import {createDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export const keyMaps = {
  toggleVisibilityKey: 'ctrl-h',
  changePositionKey: 'ctrl-d'
}

export const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey={keyMaps.toggleVisibilityKey}
    changePositionKey={keyMaps.changePositionKey}
  >
    <LogMonitor />
  </DockMonitor>
)