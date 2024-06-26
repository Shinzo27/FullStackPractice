import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/get?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="">
      <div className="text-white text-3xl p-5">Users</div>
      <div className="p-5">
        <input
          type="text"
          onChange={e=>setFilter(e.target.value)}
          name="users"
          placeholder="Search Users"
          className=" rounded-md border-none p-2 w-96"
        />
      </div>
      <div>
        {users.map((user, index) => (
          <div className="flex justify-between items-center p-5 text-white" key={index}>
            <div className="flex justify-center items-center gap-8 text-2xl">
              <div>
                <IoPersonCircleOutline />
              </div>
              <div>{user.username}</div>
            </div>
            <div>
              <button className="bg-blue-600 p-2 rounded-md" onClick={(e)=>{
                navigate("/send?id="+ user.id + "&name="+ user.firstName)
              }}>Send Money</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
