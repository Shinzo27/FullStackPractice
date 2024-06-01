import axios from "axios";
import React, { useState } from "react";

const AddTodo = () => {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/postTodos",
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data.message)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <br />
        <br />
        <button type="submit" onClick={addTodo}>Add To Do</button>
      </div>
    </>
  );
};

export default AddTodo;
