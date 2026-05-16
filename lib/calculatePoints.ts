export function calculatePoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
) {
  if (
    predictedHome === actualHome &&
    predictedAway === actualAway
  ) {
    return 3
  }

  const predictedResult =
    predictedHome > predictedAway
      ? 'HOME'
      : predictedHome < predictedAway
      ? 'AWAY'
      : 'DRAW'

  const actualResult =
    actualHome > actualAway
      ? 'HOME'
      : actualHome < actualAway
      ? 'AWAY'
      : 'DRAW'

  if (predictedResult === actualResult) {
    return 1
  }

  return 0
}