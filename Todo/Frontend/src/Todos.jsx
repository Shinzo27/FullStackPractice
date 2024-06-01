import React, { useEffect, useState } from "react";
import axios, { all } from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      const allTodos = axios.get("http://localhost:8000/getTodos", { withCredentials: true });
      setTodos(allTodos)
    }
    getTodos()
  }, []);

  return (
    <>
        <div>
                <h1>{ console.log(todos)}</h1>
                <h2>{todos.description}</h2>
                <button>{todos.completed == true ? "Completed" : "Mark as completed"}</button>
        </div>
    </>
  );
};

export default Todos;
