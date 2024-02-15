import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Component/Users'
import CreateUser from './Component/CreateUser'
import Update from './Component/Update'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Users />}/>
            <Route path="/create" element={<CreateUser />}/>
            <Route path='/update/:id' element={<Update />}/>
          </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
