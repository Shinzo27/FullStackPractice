import { useEffect, useState } from 'react'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { todosAtomFamily } from './Atoms'

function App() {
  
  return (
    <>
      <RecoilRoot>
        {/* <TodoUpdater/> */}
        <Todo id={1}/>
        <Todo id={2}/>
        <Todo id={1}/>
        <Todo id={2}/>
      </RecoilRoot>
    </>
  )
}

// function TodoUpdater() {
//   const [ todo, setTodo ] = useRecoilState(todosAtomFamily(2))

//   useEffect(()=>{
//     setTimeout(() => {
//       setTodo({
//         id: "2",
//         title: "Padh le",
//         description: "Exams AA rahe he"
//       })
//     }, 5000);
//   }, [])

//   return <div></div>
// }

function Todo({id}){
  const todo = useRecoilValue(todosAtomFamily(id))

  return(
    <>
      {todo.title}
      {todo.description}
      <br/>
    </>
  )
}

export default App
