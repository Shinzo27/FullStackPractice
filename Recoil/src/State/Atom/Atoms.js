import { atom, selector } from 'recoil'
import axios from 'axios'

// export const networkAtom = atom({
//     key: "networkAtom",
//     default: 199
// })

// export const jobAtom = atom({
//     key: "jobAtom",
//     default: 40
// })

// export const notificationAtom = atom({
//     key: "notificationAtom",
//     default: 67
// })

// export const messagingAtom = atom({
//     key: "messagingAtom",
//     default: 0
// })

export const allData = atom({
    key:"allData",
    default: selector({
        key: "allDataSelector",
        get: async ()=>{
            const res = await axios.get("https://sum-server.100xdevs.com/notifications", {withCredentials: true});
            return res.data
        }
    })
})

export const totalNumberSelector = selector({
    key: "totalNumberSelector",
    get: ({get}) =>{
        // const networkCount = get(networkAtom)
        // const jobCount = get(jobAtom)
        // const notificationCount = get(notificationAtom)
        // const messagingCount = get(messagingAtom)
        // return networkCount + jobCount + notificationCount + messagingCount
        const allNumber = get(allData)
        return allNumber.network + allNumber.jobs + allNumber.messaging + allNumber.notifications
    }
})