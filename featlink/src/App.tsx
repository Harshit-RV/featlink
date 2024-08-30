
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserLogin } from './pages/UserLogin'
import { FounderLogin } from './pages/FounderLogin'

function App() {
  return (
    <>
      <div className='h-screen'>
        <BrowserRouter>

          <Routes>

            <Route path="/user" element={ <UserLogin/> }/>
            <Route path="/founder" element={ <FounderLogin/> }/>
          </Routes>


        </BrowserRouter>
      </div>

    </>
  )
}


export default App
