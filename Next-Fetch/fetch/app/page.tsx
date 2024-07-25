import axios from "axios";


async function getDetails() {
  await new Promise((r)=>setTimeout(r,5000))
  const response = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details')
  return response.data
}

export default async function Home() {
  const userData = await getDetails()
  return (
    <>
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center flex-col gap-5">
      <div>
        {userData.email}
      </div>
      <div>
        {userData.name}
      </div>
    </div>
    </>
  );
}