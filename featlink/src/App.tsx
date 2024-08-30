
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserLogin } from './pages/UserLogin'
import { FounderLogin } from './pages/FounderLogin'
import { ListScreen } from './pages/ListScreen'
import { MyFeatRequests } from './pages/MyFeatRequests'

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
