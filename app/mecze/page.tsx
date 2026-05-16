'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MeczePage() {
  const [matches, setMatches] = useState<any[]>([])
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    loadUser()
    loadMatches()
  }, [])

  async function loadUser() {
    const { data } = await supabase.auth.getSession()
    setSession(data.session)
  }

  async function loadMatches() {
    const { data } = await supabase
      .from('matches')
      .select('*')
      .order('match_date')

    if (data) setMatches(data)
  }

  async function savePrediction(matchId: string, home: number, away: number) {
    if (!session) return alert('Musisz być zalogowany')

    await supabase.from('predictions').insert({
      user_id: session.user.id,
      match_id: matchId,
      predicted_home: home,
      predicted_away: away,
    })

    alert('Typ zapisany!')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Mecze do typowania</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <a href="/">Mecze</a>
        <a href="/ranking">Ranking</a>
        <a href="/admin">Admin</a>
      </div>

      {matches.map((m) => (
        <MatchCard key={m.id} match={m} onSave={savePrediction} />
      ))}
    </div>
  )
}

function MatchCard({ match, onSave }: any) {
  const [home, setHome] = useState(0)
  const [away, setAway] = useState(0)

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      <h3>
        {match.home_team} vs {match.away_team}
      </h3>

      <input
        type="number"
        value={home}
        onChange={(e) => setHome(Number(e.target.value))}
        placeholder="Gole gospodarzy"
      />

      <input
        type="number"
        value={away}
        onChange={(e) => setAway(Number(e.target.value))}
        placeholder="Gole gości"
      />

      <button onClick={() => onSave(match.id, home, away)}>
        Zapisz typ
      </button>
    </div>
  )
}