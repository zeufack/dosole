import type { DashboardData, Module } from "#/types";

const nextModule: Module = {
  id: 'module4',
  title: 'Jazz Improvisation',
  description: 'Learn the basics of jazz improvisation.',
  status: 'locked',
  xpReward: 700,
}

export const mockDashboardData: DashboardData = {
  user: {
    id: 'user123',
    name: 'Alice',
    level: 5,
    xp: 1200,
    xpToNextLevel: 300,
    streak: 7,
    goal: 'Learn to play "Fur Elise"',
    xpForCurrentLevel: 1500,
  },
  journal: [
    {
      id: 'entry1',
      moduleId: 'module1',
      moduleTitle: 'Basic Scales',
      completedAt: '2024-06-01T10:00:00Z',
      timeSpentMinutes: 30,
      score: 85,
      notes: 'Felt good, but need to work on left hand.',
    },
    {
      id: 'entry2',
      moduleId: 'module2',
      moduleTitle: 'Chords and Arpeggios',
      completedAt: '2024-06-02T11:00:00Z',
      timeSpentMinutes: 45,
      score: 90,
    },
  ],
  modules: [
    {
      id: 'module1',
      title: 'Basic Scales',
      description: 'Learn the major and minor scales.',
      status: 'completed',
      xpReward: 200,
    },
    {
      id: 'module2',
      title: 'Chords and Arpeggios',
      description: 'Master common chord progressions and arpeggios.',
      status: 'completed',
      xpReward: 300,
    },
    {
      id: 'module3',
      title: 'Classical Pieces',
      description: 'Start with simple classical pieces.',
      status: 'in-progress',
      xpReward: 500,
    },
    nextModule
  ],
  nextModule,
}               