import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();

  const navigate = useNavigate();

  //! get user specific from server
  useEffect(() => {
    axios
      .get("http://localhost:3001/getuser/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, []);

  const update = (e) => {
      e.preventDefault()

      axios.put("http://localhost:3001/updateUser/"+id, { name, email, age})
      .then((response) => {
        // Handle the response if needed
        console.log("User updated successfully:", response.data);
        navigate("/")
      })
      .catch((error) => {
        // Handle the error if there is any
        console.error("Error updating user:", error);
      });
  }

  return (
    <div className="container mt-5">
      <h2 className="d-flex justify-content-center">
        Modifier les info d'un utilisateur
      </h2>

      <div className="d-flex justify-content-center align-items-center">
        {/* Formulaire Bootstrap */}
        <form onSubmit={update} className="w-50">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name"
            value={name}
            onChange={(e)  => setName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e)  => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Âge
            </label>
            <input 
            type="number"
            className="form-control" 
            id="age" 
            name="age"
            value={age}
            onChange={(e) => {setAge(Number(e.target.value))}}/>
          </div>

          <button type="submit" className="w-100 btn btn-outline-warning">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
