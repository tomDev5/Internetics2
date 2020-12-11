import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopBar from './Components/TopBar';
import SideBar from './Components/SideBar';
import Feed from './Pages/Feed';

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <TopBar></TopBar>
        <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
        <div className="col-sm-2" style={{height: '100%'}}>
          <SideBar></SideBar>
        </div>
        <div className="col-sm-10" style={{height: '100%'}}>
        <Router>
          <Route path="/" exact render={props=>{
              return <Feed></Feed>
            }} />
          <Route path="/Profile" exact render={props=>{
            return <h1>/Profile</h1>
          }} />
          <Route path="/Settings" exact render={props=>{
            return <h1>/Settings</h1>
          }} />
        </Router>
      </div>
      </div>
    </div>
  );
}

export default App;
