import { useMemo, useState } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { jobAtom, messagingAtom, networkAtom, notificationAtom, totalNumberSelector } from './State/Atom/Atoms'


function App() {
  return <RecoilRoot>
    <MainApp/>
  </RecoilRoot>
}

function MainApp(){
  const networkCount = useRecoilValue(networkAtom)
  const jobCount = useRecoilValue(jobAtom)
  const messagingCount = useRecoilValue(messagingAtom)
  const NotificationsCount = useRecoilValue(notificationAtom)
  const setMessagingCount = useSetRecoilState(messagingAtom)

  //using useMemo
  // const totalNumbers = useMemo(()=>{
  //   return networkCount + jobCount + messagingCount + NotificationsCount
  // }, [networkCount, jobCount, messagingCount, NotificationsCount])
  const totalValue = useRecoilValue(totalNumberSelector)

  return (
    <>
      <button>Home</button>
      <button>My Network ({networkCount >= 100 ? "99+" : networkCount})</button>
      <button>Jobs ({jobCount >= 100 ? "99+" : jobCount})</button>
      <button>Messaging ({messagingCount >= 100 ? "99+" : messagingCount})</button>
      <button>Notifications ({NotificationsCount >= 100 ? "99+" : NotificationsCount})</button>
      {/* <button onClick={()=>{setMessagingCount(c => c+1)}}>Me</button> */}
      <button>Me ({totalValue})</button>
    </>
  )
}

export default App
