import Redis from 'ioredis';

let redisClient: Redis | null = null;

export async function connectRedis(url: string): Promise<Redis> {
  if (redisClient) {
    return redisClient;
  }

  redisClient = new Redis(url);

  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });

  redisClient.on('error', (error) => {
    console.error('Redis connection error', error);
  });

  await redisClient.ping();
  return redisClient;
}

export function getRedisClient(): Redis | null {
  return redisClient;
}
