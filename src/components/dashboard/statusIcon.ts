 import type { ModuleStatus } from '#/types'

  export const statusIcon: Record<ModuleStatus, string> = {
    completed: '✅',
    'in-progress': '🔵',
    unlocked: '⬜',
    locked: '🔒',
  }