import './App.css'
import { RecoilRoot, useRecoilStateLoadable } from 'recoil'
import { todosAtomFamily } from './Atom'
function App() {

  return (
    <>
      <RecoilRoot>
        <Todo id={1}/>
        <Todo id={2}/>
      </RecoilRoot>
    </>
  )
}

function Todo({id}){
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id))

  if(todo.state === "loading") {
    return <div>Loading.......</div>
  }
  else if(todo.state === "hasValue") {
    return <div>
      {todo.contents.title}
      {todo.contents.description}
      <br/>
    </div>
  }
}

export default App
