'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function HomePage() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Typowanie Mundialu
          </h1>

          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
          />
        </div>
        <div className="flex gap-4 mb-6">
  <a href="/" className="underline">Mecze</a>
  <a href="/ranking" className="underline">Ranking</a>
  <a href="/admin" className="underline">Admin</a>
</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Typowanie Mundialu
          </h1>

          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Wyloguj
          </button>
        </div>

        <p className="text-lg">
          Zalogowany jako: {session.user.email}
        </p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-black p-3 flex justify-around">
  <a href="/">Mecze</a>
  <a href="/ranking">Ranking</a>
  <a href="/admin">Admin</a>
</div>
    </main>
  )
}
