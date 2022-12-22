
import './App.css'
import Add from './components/Add'
import Header from './components/Header'
import {Routes,Route} from 'react-router-dom'
import Mainpage from './components/Mainpage'

function App() {



  return (
    <div >
       <Header/>
      <Routes>
        <Route path='/' element={<Mainpage/>}></Route>
        <Route path="/:id" element={<Add/>}></Route>
      </Routes>
     
    </div>
  )
}

export default App
