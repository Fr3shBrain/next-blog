import { nanoid } from 'nanoid'
import Redis from 'ioredis'

export default async function handler(req, res) {
  // req client tarafından gelen res node uygulamamızın hazırladığı response
  // CREATE
  if (req.method === 'POST') {
    const { url, userToken, text } = req.body

    if (!url || !userToken || !text)
      return res
        .status(400)
        .json({ message: 'parametreler eksik veya hatalı!' })

    // user'ı doğrula
    // https://auth0.com/docs/api/authentication?shell#change-password
    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    const user = await userResponse.json()

    const comment = {
      id: nanoid(),
      createdAt: Date.now(),
      text,
      user: {
        name: user.name,
        picture: user.picture
      }
    }
    // https://console.upstash.com/redis/392a8175-6950-4e48-a194-89fb2d473c99
    // https://redis.io/commands/lpush
    // redis connection
    let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL)
    // redis write
    redis.lpush(url, JSON.stringify(comment))
    // redis quit
    redis.quit()
    // redis response
    res.status(200).json(comment)
  }

  // FETCH
  if (req.method === 'GET') {
    const { url } = req.query

    let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL)
    const comments = await redis.lrange(url, 0, -1)
    redis.quit()

    const data = comments.map((o) => JSON.parse(o))

    res.status(200).json(data)
  }
}
