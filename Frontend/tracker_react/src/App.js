import './App.css';
import {React} from 'react';
import Login from './components/Login/login';
import OAuth from './components/Login/oauth';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MyProjects } from './components/myprojects';
import { MyCards } from './components/mycards';
import { AllProjects } from './components/allprojects';
import { Members } from './components/members';
import { CreateProject } from './components/createproject';
import { ShowProject } from './components/showproject';
import { Lists } from './components/lists';
import { ListDetail } from './components/listdetail';
import { ListCards } from './components/cards';
import { CardDetails } from './components/carddetails';
import { MemberDetails } from './components/memberdetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route exact path='/oauth' element={<OAuth />}/>
        <Route exact path='/myprojects' element={<MyProjects />}/>
        <Route exact path='/mycards' element={<MyCards />}/>
        <Route exact path='/projects' element={<AllProjects />}/>
        <Route exact path='/members' element={<Members />}/>
        <Route exact path='/members/:m_id/' element={<MemberDetails />}/>
        <Route exact path='/createproject' element={<CreateProject />}/>
        <Route exact path='/projects/:p_id' element={<ShowProject />}/>
        <Route exact path='/projects/:p_id/lists' element={<Lists />}/>
        <Route exact path='/projects/:p_id/lists/:l_id' element={<ListDetail />}/>
        <Route exact path='/projects/:p_id/lists/:l_id/cards' element={<ListCards />}/>
        <Route exact path='/projects/:p_id/lists/:l_id/cards/:c_id' element={<CardDetails />}/>
        
      </Routes>
    </Router>
  );
}

export default App;
