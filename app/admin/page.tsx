'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [session, setSession] = useState<any>(null)

  const [home, setHome] = useState('')
  const [away, setAway] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [])

  if (!session) {
    return <div className="p-8">Musisz być zalogowany</div>
  }

  const ADMIN_EMAIL = "adziokks@gmail.com"
  const isAdmin = session.user.email === ADMIN_EMAIL

  if (!isAdmin) {
    return <div className="p-8 text-red-500">Brak dostępu</div>
  }

  async function addMatch() {
    await supabase.from('matches').insert({
      home_team: home,
      away_team: away,
      match_date: date,
    })

    alert('Dodano mecz')
    setHome('')
    setAway('')
    setDate('')
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-white/10">
        <h1 className="text-3xl font-bold mb-6">
          Panel Admina
        </h1>

        <input
          placeholder="Gospodarz"
          value={home}
          onChange={(e) => setHome(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <input
          placeholder="Gość"
          value={away}
          onChange={(e) => setAway(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <button
          onClick={addMatch}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 font-bold"
        >
          Dodaj mecz
        </button>
        <button
  onClick={async () => {
    await fetch('/api/import', { method: 'POST' })
    alert('Import wykonany')
  }}
  className="bg-green-600 text-white p-2 rounded mt-4"
>
  Import Mundialu
</button>
      </div>
    </main>
  )
}