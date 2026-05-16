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

  const isAdmin = session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

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
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
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
          className="w-full bg-black text-white p-3 rounded"
        >
          Dodaj mecz
        </button>
      </div>
    </main>
  )
}