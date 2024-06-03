import { atomFamily } from 'recoil'
import { TODOS } from '../Todos'

export const todosAtomFamily = atomFamily({
    key: "todosAtomFamily",
    default: id => {
         return TODOS.find(x => x.id === id)
    }
})
