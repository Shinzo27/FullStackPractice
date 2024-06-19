import './App.css'

function App() {

  return (
    <>
      <Todo title='GO to gym' description='Gym jaaaa' done={false} />
    </>
  )
}

interface TodoProps {
  title: string,
  description: string, 
  done: boolean
}

function Todo(props: TodoProps){
  return (
    <div>
      <h1>{props.title}</h1>
      <h1>{props.description}</h1>
      <h1>{props.done}</h1>
    </div>
  )
}

export default App
