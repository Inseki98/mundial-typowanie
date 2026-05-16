'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Ranking from '@/components/Ranking'

interface Match {
  id: string
  home_team: string
  away_team: string
  match_date: string
}

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    fetchMatches()
  }, [])

  async function fetchMatches() {
    const { data } = await supabase
      .from('matches')
      .select('*')
      .order('match_date')

    if (data) {
      setMatches(data)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Typowanie Mundialu
        </h1>

        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">
                  {match.home_team}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-16 border rounded p-2 text-center"
                  />

                  <span>:</span>

                  <input
                    type="number"
                    className="w-16 border rounded p-2 text-center"
                  />
                </div>

                <div className="text-xl font-semibold">
                  {match.away_team}
                </div>
              </div>

              <div className="mt-4 text-gray-500">
                {new Date(match.match_date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
<Ranking />