import Redis, { createClient } from 'redis';

const redis = createClient({
    url: process.env.REDIS_URL
});

redis.on('connect', () => {
    console.log('Redis connected');
});

redis.on('error', (err) => {
    console.log(process.env.REDIS_PORT)
    console.error('Redis error', err);
});

redis.connect();

export default redis;
