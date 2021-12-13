import React, { useState, useRef } from "react";
import User from "./User";

function App() {
  const formRef = useRef();
  const [users, setUsers] = useState([]);
  console.log(users);

  //download npm cors in backend part

  //GET Request
  const fetchData = () => {
    fetch("http://localhost:4001/users")
      //inside the a sync code we are using json() but outside we need to use JSON.parse or JSON stringfy
      .then((res) => res.json())
      .then((results) => setUsers(results.data))

      .catch((err) => console.log(err.message));
  };

  //POST Request
  const addNewUser = (e) => {
    e.preventDefault();
    let user = {
      id: Date.now(),
      first_name: formRef.current.first_name.value,
      last_name: formRef.current.last_name.value,
      email: formRef.current.email.value,
      avatar: formRef.current.avatar.value,
    };
    const jsonData = JSON.stringify(user);
    fetch("http://localhost:4001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonData,
    })
      .then((res) => res.json())
      .then((result) => setUsers(result.data))

      .catch((err) => console.log(err.message));
  };

  //DELETE Request
  const deleteUser = (id) => {
    fetch(`http://localhost:4001/users/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUsers(users.filter((item) => item.id !== id));
        }
      });

    // setUsers(result.data));
  };

  //PUT or PATCH request
  const editUser = (e, id) => {
    let updatedUser = {
      first_name: e.target.first_name.value,
      avatar: e.target.avatar.value,
    };

    fetch(`http://localhost:4001/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUsers(result.data);
      });
  };

  //only headers are traveling

  return (
    <div className="App">
      <h1>My React App</h1>
      <form onSubmit={addNewUser} ref={formRef}>
        <label>
          {" "}
          first_name :<input type="text" name="first_name" />
        </label>
        <br />
        <label>
          {" "}
          last_name :<input type="text" name="last_name" />
        </label>
        <br />
        <label>
          {" "}
          email :<input type="email" name="email" />
        </label>
        <br />
        <label>
          {" "}
          avatar :<input type="text" name="avatar" />
        </label>
        <br />
        <input type="submit" value="add user" />
      </form>
      <br />
      <br />
      <button onClick={fetchData}>fetch user</button>
      {users.map((user) => {
        return <User deleteUser={deleteUser} editUser={editUser} user={user} />;
      })}
    </div>
  );
}

export default App;
