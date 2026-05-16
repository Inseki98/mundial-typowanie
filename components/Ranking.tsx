export default function Ranking() {
  const users = [
    {
      name: 'Kuba',
      points: 12,
    },
    {
      name: 'Mateusz',
      points: 10,
    },
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Ranking
      </h2>

      <div className="space-y-2">
        {users.map((user, index) => (
          <div
            key={user.name}
            className="flex justify-between border-b pb-2"
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
  )
}