import { mockDashboardData } from '#/data/dashboard'
import type { Module } from '#/types'

export function getModuleById(id: string): Module | undefined {
    return mockDashboardData.modules.find(m => m.id === id)
}