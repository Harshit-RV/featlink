
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserLogin } from './pages/UserLogin'
import { FounderLogin } from './pages/FounderLogin'
import { ListScreen } from './pages/ListScreen'
import { MyFeatRequests } from './pages/MyFeatRequests'
import { FeatureList } from './pages/FeatureList'
import { FounderView } from './pages/FounderView'

function App() {
  return (
    <>
      <div className='flex flex-col'>
        
          {/* <AppBar/> */}

          <Routes>

            <Route path="/user" element={ <UserLogin/> }/>
            <Route path="/explore" element={ <ListScreen isFounder={false}/> }/>
            <Route path="/explore/:productId" element={ <FeatureList/> }/>
            <Route path="/my-requests" element={ <MyFeatRequests/> }/>
            <Route path="/founder" element={ <ListScreen isFounder/> }/>
            <Route path="/founder/:productId" element={ <FounderView /> }/>
            <Route path="/analyse" element={ <FounderLogin/> }/>
          </Routes>

      </div>

    </>
  )
}


export default App
