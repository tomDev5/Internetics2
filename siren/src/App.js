import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopBar from './Components/TopBar';
import SideBar from './Components/SideBar';
import Feed from './Pages/Feed';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';

function App() {

  let state = {
    rooms: [
      {name: 'Room1', id: "A"},
      {name: 'Room2', id: "B"},
      {name: 'Room3', id: "C"}
  ],
    room: null
  }
  
  let updateSelectedRoom = (room) => {
    state.room = room
  }

  return (
    <div className="App" style={{height: '100%'}}>
      
        <Router>
          <Route path="/" exact render={props=>{
              return <>
                <TopBar></TopBar>
                  <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                  <div className="col-sm-2" style={{height: '100%'}}>
                    <SideBar rooms={state.rooms} updateSelectedRoom={updateSelectedRoom}></SideBar>
                  </div>
                  <div className="col-sm-10" style={{height: '100%'}}>
                    <Feed selectedRoom={state.room}></Feed>
                  </div>
                  </div>
                </>
              }} />
          <Route path="/Profile" exact render={props=>{
            return <>
            <TopBar></TopBar>
              <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
              <div className="col-sm-2" style={{height: '100%'}}>
                <SideBar></SideBar>
              </div>
              <div className="col-sm-10" style={{height: '100%'}}>
                <Profile></Profile>
              </div>
              </div>
            </>
          }} />
          <Route path="/Settings" exact render={props=>{
            return <h1>/Settings</h1>
          }} />
          <Route path="/Login" exact render={props=>{
            return <>
              <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                <div className="col-sm-12">
                  <Login></Login>
                </div>
              </div>
                </>
          }} />
          <Route path="/ResetPassword" exact render={props=>{
            return <>
            <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
              <div className="col-sm-12">
                <ResetPassword></ResetPassword>
              </div>
            </div>
              </>
          }} />
        </Router>
      </div>
  );
}

export default App;
