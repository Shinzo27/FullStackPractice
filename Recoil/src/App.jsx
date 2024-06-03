import { useMemo, useState } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { allData, totalNumberSelector } from './State/Atom/Atoms'


function App() {
  return <RecoilRoot>
    <MainApp/>
  </RecoilRoot>
}

function MainApp(){
  // const networkCount = useRecoilValue(networkAtom)
  // const jobCount = useRecoilValue(jobAtom)
  // const messagingCount = useRecoilValue(messagingAtom)
  // const NotificationsCount = useRecoilValue(notificationAtom)
  // const setMessagingCount = useSetRecoilState(messagingAtom)

  const [networkCount, setNetworkCount] = useRecoilState(allData)
  const totalNumbers = useRecoilValue(totalNumberSelector)

  //using useMemo
  // const totalNumbers = useMemo(()=>{
  //   return networkCount + jobCount + messagingCount + NotificationsCount
  // }, [networkCount, jobCount, messagingCount, NotificationsCount])

  //using selector
  // const totalValue = useRecoilValue(totalNumberSelector)

  return (
    <>
      <button>Home</button>
      <button>My Network ({networkCount.network >= 100 ? "99+" : networkCount.network})</button>
      <button>Jobs ({networkCount.jobs >= 100 ? "99+" : networkCount.jobs})</button>
      <button>Messaging ({networkCount.messaging >= 100 ? "99+" : networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications >= 100 ? "99+" : networkCount.notifications})</button>
      {/* <button onClick={()=>{setMessagingCount(c => c+1)}}>Me</button> */}
      <button>Me ({totalNumbers})</button>
    </>
  )
}

export default App
