import React, { useState } from "react";

const User = ({ deleteUser, editUser, user }) => {
  const [editMode, setEditMode] = useState(false);

  const submitEditForm = (e, id) => {
    e.preventDefault();
    editUser(e, id);
    setEditMode(false);
  };

  return (
    <div>
      {
        editMode ? (
          <form onSubmit={(e) => submitEditForm(e, user.id)}>
            <label>
              first_name :<input type="text" name="first_name" />
            </label>
            <label>
              avatar :<input type="text" name="avatar" />
            </label>
            <br />
            <input type="submit" value="edit User" />
          </form>
        ) : (
          <>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <img src={user.avatar} width="200" alt="" />
          </>
        ) /*  */
      }
      <button onClick={() => setEditMode(true)}>Edit</button>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </div>
  );
};

export default User;
