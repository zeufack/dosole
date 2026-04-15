import { CheckCircle2, CircleDot, Circle, Lock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ModuleStatus } from '#/types'

export const statusIcon: Record<ModuleStatus, LucideIcon> = {
  completed: CheckCircle2,
  'in-progress': CircleDot,
  unlocked: Circle,
  locked: Lock,
}