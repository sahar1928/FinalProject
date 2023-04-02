import React, { useState, useContext } from "react";
import { UserContext } from "../../assets/UserContext";
import { URL } from "../../assets/url";
import { User } from "../../assets/user";

const ProfileTemp = () => {
  const { setUser, user } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user ? user.FirstName : '');
  const [lastName, setLastName] = useState(user ? user.LastName : '');
  const [email, setEmail] = useState(user ? user.Email: '');


  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(URL + `users/${user.UserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
        }),
      });
      const data = await res.json();

      setUser(prevUser => ({
        ...prevUser,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
      }));
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleAddMoney = async () => {
    const myData = {
      UserId: user.UserId,
      Balance: 30
    };
  
    try {
      const res = await fetch(URL + `users/addFunds`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myData),
      });
  
      const data = await res.json();
  
      const updatedUserBalance = {
        UserId: user.UserId,
        Balance: user.UserBalance.Balance + data
      };
  
      const updatedUser = {
        ...user,
        UserBalance: updatedUserBalance
      };
  
      setUser(updatedUser);
  
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div>
      <h2>Profile</h2>
      {!editing && user && (
        <div>
          <p>
            <strong>First Name: </strong> {user.FirstName}
          </p>
          <p>
            <strong>Last Name: </strong> {user.LastName}
          </p>
          <p>
            <strong>Email: </strong> {user.Email}
          </p>
          <p>
            <strong>Balance: </strong> {user.UserBalance.Balance}
          </p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleAddMoney}>Add Money</button>
        </div>
      )}
      {editing && (
        <div>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ProfileTemp;
