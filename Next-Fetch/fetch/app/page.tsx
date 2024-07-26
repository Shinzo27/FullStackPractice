import axios from "axios";
import {PrismaClient} from '@prisma/client'

const client = new PrismaClient()

async function getDetails() {
  const user = await client.user.findFirst({})
  return { 
    username: user?.username,
    password: user?.password
  }
}

export default async function Home() {
  const userData = await getDetails()
  return (
    <>
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center flex-col gap-5">
      <div>
        {userData.username}
      </div>
      <div>
        {userData.password}
      </div>
    </div>
    </>
  );
}