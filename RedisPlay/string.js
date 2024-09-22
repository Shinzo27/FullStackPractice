import client from './client.js';

async function init() {
    await client.set('user:4', 'John');
    await client.expire('user:4', 10);
    const result = await client.get('user:1');
    console.log(result);
}

init();