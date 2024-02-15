import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();

  const navigate = useNavigate()


  //! Pour  envoyer les données au serveur  et apres suvegarder dans la BD
  const Submit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/createUser", { name, email, age,})
      .then((response) => {
        // Handle the response if needed
        console.log("User created successfully:", response.data);
        navigate("/")
      })
      .catch((error) => {
        // Handle the error if there is any
        console.error("Error creating user:", error);
      });
  };

    

  return (
    <div className="container mt-5">
      <h2 className="d-flex justify-content-center">Ajouter un utilisateur</h2>

      <div className="d-flex justify-content-center align-items-center">
        {/* Formulaire Bootstrap */}
        <form onSubmit={Submit} className="w-50">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button type="submit" className="w-100 btn btn-outline-success">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
