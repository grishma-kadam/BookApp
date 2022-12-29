
import './App.css'
import Add from './components/Add'
import Header from './components/Header'
import {Routes,Route, Navigate} from 'react-router-dom'
import Mainpage from './components/Mainpage'
import { AuthContext } from './store/authContext'
import { useContext,useEffect } from 'react'
import Cred from './components/Cred'
function App() {

const {user}=useContext(AuthContext)

useEffect(() => {

}, [user]);

  return (
    <div >
       <Header/>
      <Routes>
        <Route path='/' element={user?<Mainpage/>:<Navigate to="/user/login"/>}></Route>
        <Route path="/user/:id" element={!user?<Cred/>:<Navigate to="/"/>}></Route>
        <Route path="/:id" element={user?<Add/>:<Navigate to="/user/login"/>}></Route>
      </Routes>
     
    </div>
  )
}

export default App
