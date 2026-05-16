import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function getPoints(pred: any, match: any) {
  if (
    pred.predicted_home === match.home_score &&
    pred.predicted_away === match.away_score
  ) return 3

  const predRes = pred.predicted_home > pred.predicted_away ? 'H' : pred.predicted_home < pred.predicted_away ? 'A' : 'D'
  const actRes = match.home_score > match.away_score ? 'H' : match.home_score < match.away_score ? 'A' : 'D'

  return predRes === actRes ? 1 : 0
}

export async function POST() {
  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .eq('finished', true)

  for (const match of matches || []) {
    const { data: preds } = await supabase
      .from('predictions')
      .select('*')
      .eq('match_id', match.id)

    for (const p of preds || []) {
      const points = getPoints(p, match)

      await supabase
        .from('predictions')
        .update({ points })
        .eq('id', p.id)
    }
  }

  return NextResponse.json({ ok: true })
}