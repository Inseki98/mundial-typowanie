'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RankingPage() {
  const [ranking, setRanking] = useState<any[]>([])

useEffect(() => {
  fetchRanking()

  const channel = supabase
    .channel('ranking-live')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'predictions'
    }, () => {
      fetchRanking()
    })
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
  async function fetchRanking() {
    const { data } = await supabase
      .from('predictions')
      .select('points, users(name)')

    if (!data) return

    const grouped: any = {}

    data.forEach((item: any) => {
      const name = item.users?.name || 'Unknown'

      if (!grouped[name]) {
        grouped[name] = 0
      }

      grouped[name] += item.points
    })

    const result = Object.entries(grouped)
      .map(([name, points]) => ({
        name,
        points,
      }))
      .sort((a: any, b: any) => b.points - a.points)

    setRanking(result)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-white/10">
        <h1 className="text-4xl font-bold mb-8">
          Ranking
        </h1>

        <div className="space-y-4">
          {ranking.map((user, index) => (
            <div
              key={user.name}
              className="flex justify-between border-b pb-4"
            >
              <div>
                #{index + 1} {user.name}
              </div>

              <div>
                {user.points} pkt
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}