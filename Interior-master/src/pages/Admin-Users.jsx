import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import "./Admin.css"

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const { authorizationToken, API } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   delelte the user on delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users after delete:  ${data}`);

      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <section className="admin-users-section" style={{marginLeft:"100px",marginBottom:"50px",marginTop:"50px"}}>
        <div className="containerUsers">
          <h1>Admin Users Data </h1>
        </div>
        <div className="containerUsers  admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                      <Link className="btn" style={{padding:"15px",margin:"0px 20px"}} to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteUser(curUser._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};