import {atom, selector} from 'recoil'

export const userAtom = atom({
    key: "userAtom",
    default: {
        isAuthenticated: false,
        user: null
    }
})

export const isAuthenticatedSelector = selector({
    key: "isAuthenticatedSelector",
    get: ({get})=>{
        const auth = get(userAtom)
        return auth.isAuthenticated
    }
})