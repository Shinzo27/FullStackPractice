import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '../lib/auth'

export default async function () {
    const session = await getServerSession(NEXT_AUTH)
    return <div>
        User details : 
        <br/>
        <br/>
        { JSON.stringify(session)}
    </div>
}