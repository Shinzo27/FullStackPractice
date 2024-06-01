import React, { useEffect, useState } from "react";
import axios, { all } from "axios";

const Todos = () => {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("http://localhost:8000/getTodos", {
        withCredentials: true,
      });
      setAllTodos(data.todos);
    };
    fetchTodos();
  }, []);

  const updateTodo = async (id, e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `http://localhost:8000/updateTodo/${id}`,
        {},
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Methods": "PUT" },
        }
      );
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id, e) => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/deleteTodo/${id}`,
        {},
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Methods": "DELETE" },
        }
      );
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {allTodos.map((todo, index) => (
        <div key={index}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button onClick={(e)=> updateTodo(todo._id, e)}>
            {todo.completed == "True" ? "Completed" : "Mark as read"}
          </button>
          <button style={{marginLeft: 10}} onClick={(e)=> deleteTodo(todo._id, e)}>
            Delete Todo
          </button>
        </div>
      ))}
    </>
  );
};

export default Todos;
