'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function PredictionForm({
  match,
  user,
}: any) {
  const [home, setHome] = useState('')
  const [away, setAway] = useState('')
  const isLocked = new Date(match.match_date) < new Date()

  async function savePrediction() {
    await supabase.from('predictions').insert({
      user_id: user.id,
      match_id: match.id,
      predicted_home: Number(home),
      predicted_away: Number(away),
    })

    alert('Typ zapisany!')
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow mb-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-lg">
          {match.home_team}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={home}
            onChange={(e) => setHome(e.target.value)}
            type="number"
            className="w-16 border rounded p-2 text-center"
          />

          <span>:</span>

          <input
            value={away}
            onChange={(e) => setAway(e.target.value)}
            type="number"
            className="w-16 border rounded p-2 text-center"
          />
        </div>

        <div className="font-bold text-lg">
          {match.away_team}
        </div>
      </div>

        {isLocked && (
        <div className="text-red-500 mt-4">
          Typowanie zamknięte
         </div>
        )}

      <button
        onClick={savePrediction}
        className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
        disabled={isLocked}
      >
        Zapisz typ
      </button>
    </div>
  )
}