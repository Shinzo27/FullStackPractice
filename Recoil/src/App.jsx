import { useMemo, useState } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { totalNumberSelector } from './State/Atom/Atoms'
import {networkAtom, jobAtom, messagingAtom, notificationAtom} from './State/Atom/Atoms'

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
      <button>My Network ({networkCount >= 100 ? "99+" : networkCount.network})</button>
      <button>Jobs ({jobCount >= 100 ? "99+" : jobCount})</button>
      <button>Messaging ({messagingCount >= 100 ? "99+" : messagingCount})</button>
      <button>Notifications ({NotificationsCount >= 100 ? "99+" : NotificationsCount})</button>
      <button onClick={()=>{setMessagingCount(c => c+1)}}>Me</button>
      <button>Me ({totalNumbers})</button>
    </>
  )
}

export default App
