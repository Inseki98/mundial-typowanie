import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  const matches = [
    { home_team: 'Polska', away_team: 'Niemcy', match_date: '2026-06-12T18:00:00' },
    { home_team: 'Brazylia', away_team: 'Argentyna', match_date: '2026-06-13T20:00:00' },
    { home_team: 'Francja', away_team: 'Hiszpania', match_date: '2026-06-14T20:00:00' }
  ]

  for (const m of matches) {
    await supabase.from('matches').insert(m)
  }

  return NextResponse.json({ imported: true })
}