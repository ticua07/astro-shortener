import { createClient } from "redis";

const redis = createClient({
    url: import.meta.env.REDIS_URL
})

await redis.connect()

export { redis };