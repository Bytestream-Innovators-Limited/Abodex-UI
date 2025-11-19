import { config } from '@/config';
import Redis from 'ioredis';

let generalClient: Redis | undefined;

export async function getRedis(): Promise<Redis> {
    if (!generalClient) {
        generalClient = new Redis(config.REDIS_URL, {
            commandTimeout: 10 * 1000, // 10 seconds
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
            maxRetriesPerRequest: 3
        });
        generalClient.on("error", (err) => {
            console.error("Redis connection error:", err);
        });

        generalClient.on("connect", () => {
            console.log("Successfully connected to Redis");
        });
    }
    console.log('ioredis general client already connected');
    return generalClient;
}

// Cache data with fetch function and expiration
export async function cacheData<T>(key: string, fetchData: () => Promise<T>, expires: number = 3 * 60 * 60): Promise<T> {
    const redis = await getRedis();
    const cachedData = await redis.get(key);
    if (cachedData) {
        return JSON.parse(cachedData);
    } else {
        const freshData = await fetchData();
        await redis.set(key, JSON.stringify(freshData), 'EX', expires); // Cache for 3 hours by default (in seconds)
        return freshData;
    }
}

// Delete data from Redis by key
export async function deleteData(key: string): Promise<void> {
    const redis = await getRedis();
    try {
        const result = await redis.del(key);
        if (result > 0) {
            console.log(`Successfully deleted data for key: ${key}`);
        } else {
            console.log(`No data found for key: ${key} to delete`);
        }
    } catch (error) {
        console.error(`Error deleting data for key ${key}:`, error);
        throw error;
    }
}

// Set data in Redis with optional expiration
export async function setData<T>(key: string, value: T, expires?: number): Promise<void> {
    const redis = await getRedis();
    try {
        const stringValue = JSON.stringify(value);
        if (expires) {
            await redis.set(key, stringValue, 'EX', expires); // Set with expiration in seconds
            console.log(`Successfully set data for key ${key} with expiration of ${expires} seconds`);
        } else {
            await redis.set(key, stringValue); // Set without expiration
            console.log(`Successfully set data for key ${key} without expiration`);
        }
    } catch (error) {
        console.error(`Error setting data for key ${key}:`, error);
        throw error;
    }
}

// Get data from Redis by key
export async function getData<T>(key: string): Promise<T | null> {
    const redis = await getRedis();
    try {
        const cachedData = await redis.get(key);
        if (cachedData) {
            return JSON.parse(cachedData) as T;
        }
        console.log(`No data found for key: ${key}`);
        return null;
    } catch (error) {
        console.error(`Error getting data for key ${key}:`, error);
        throw error;
    }
}