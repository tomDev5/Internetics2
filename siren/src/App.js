import './App.css';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route } from 'react-router-dom'
import TopBar from './Components/TopBar';
import SideBar from './Components/SideBar';
import Feed from './Pages/Feed';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import SignUp from './Pages/SignUp';

export default class App extends Component {

  state = {
    rooms: [],
    selectedRoom: null
  }

  updateSelectedRoom = (newSelectedRoom) => {
    this.setState({selectedRoom: newSelectedRoom})
  }

  componentDidMount() {
    this.getRooms()
  }

  getRooms = () => {
    const recipeUrl = '/api/users/rooms'
    const requestMetadata = {
      method: 'GET'
    }
    fetch(recipeUrl, requestMetadata)
      .then(async res => {
        let json = await res.json()
        this.setState({rooms: json})
      })
        .catch((e) => {
            this.setState({errorMessage: 'Please try again in a few minutes.'})
            console.log(e)
        })
  }

  render() {
      return (
      <div className="App" style={{height: '100%'}}>
          <HashRouter>
            <Route path="/Feed" exact component={props=>{
                return <>
                  <TopBar></TopBar>
                    <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                    <div className="col-sm-2" style={{height: '100%'}}>
                      <SideBar rooms={this.state.rooms} selectedRoom={this.state.selectedRoom} updateSelectedRoom={this.updateSelectedRoom}></SideBar>
                    </div>
                    <div className="col-sm-10" style={{height: '100%'}}>
                      <Feed selectedRoom={this.state.selectedRoom}></Feed>
                    </div>
                    </div>
                  </>
                }} />
            <Route path="/Profile/:id?" exact component={props=>{
              return <>
              <TopBar></TopBar>
                <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                <div className="col-sm-2" style={{height: '100%'}}>
                  <SideBar rooms={this.state.rooms} selectedRoom={this.state.selectedRoom} updateSelectedRoom={this.updateSelectedRoom}></SideBar>
                </div>
                <div className="col-sm-10" style={{height: '100%'}}>
                  <Profile rooms={this.state.rooms} params={props.match.params}></Profile>
                </div>
                </div>
              </>
            }} />
            <Route path="/Login" exact component={props=>{
              return <>
                <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                  <div className="col-sm-12">
                    <Login getRooms={this.getRooms}></Login>
                  </div>
                </div>
                  </>
            }} />
            <Route path="/SignUp" exact component={props=>{
              return <>
                <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                  <div className="col-sm-12">
                    <SignUp></SignUp>
                  </div>
                </div>
                  </>
            }} />
            <Route path="/ResetPassword" exact component={props=>{
              return <>
              <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                <div className="col-sm-12">
                  <ResetPassword></ResetPassword>
                </div>
              </div>
                </>
            }} />
          </HashRouter>
        </div>
    );
        }
}