
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserLogin } from './pages/UserLogin'
import { FounderLogin } from './pages/FounderLogin'
import { ListScreen } from './pages/ListScreen'
import { MyFeatRequests } from './pages/MyFeatRequests'
import { AppBar } from './components/AppBar'

function App() {
  return (
    <>
      <div className='flex flex-col'>
        
          {/* <AppBar/> */}

          <Routes>

            <Route path="/user" element={ <UserLogin/> }/>
            <Route path="/explore" element={ <ListScreen/> }/>
            <Route path="/my-requests" element={ <MyFeatRequests/> }/>
            <Route path="/founder" element={ <FounderLogin/> }/>
          </Routes>

      </div>

    </>
  )
}


export default App
