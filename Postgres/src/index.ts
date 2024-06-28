import { Client } from 'pg'

const client = new Client({
    connectionString: "postgresql://postgres:root@localhost/postgres"
})

async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
        FROM users
        INNER JOIN addresses ON users.id = addresses.user_id;
    `)
    console.log(result)
}

createUsersTable()

