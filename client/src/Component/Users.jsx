import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

    //! "//! for refreshing when deleting a user"
    useEffect( () => {
     fetchUser();
  },[])

  //! get users from server
  const fetchUser = () => {
    axios.get("http://localhost:3001")
    .then(result => setUsers(result.data))
    .catch(err => console.log(err))
  }

    //! delete user function
    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/deleteUser/${id}`)
        .then(res => {
          console.log(res);
        // Update the state after successful deletion
          fetchUser();

        })
        .catch(err => console.log(err));
    };
    

  return (
    <div className='container'>
      
      {/* Tableau  pour afficher les utilisateurs */}
      <div className='d-flex justify-content-center align-items-center'>
        <div className='w-50 rounded p-3'>
        <h2 className='d-flex justify-content-center align-items-center'>Liste des Utilisateurs</h2>
        <Link to="/create" className='btn btn-success d-flex justify-content-center align-items-center'>Ajouter</Link>  
        <br /><br /><br /> 
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Âge</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                        <Link to={`/update/${user._id}`} className='btn btn-outline-warning'>Update</Link>  
                        <button className='btn btn-outline-danger m-1'
                          onClick={(e) => handleDelete(user._id)}>
                            Delete
                          </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
      
    </div>
  );
}

export default Users;
