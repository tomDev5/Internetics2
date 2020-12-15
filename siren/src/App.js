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
    sirens: [],
    selectedRoom: null,
    userData: {
      name: null,
      username: null
    }
  }

  updateSelectedRoom = (newSelectedRoom) => {
    this.setState({selectedRoom: newSelectedRoom})
  }

  componentDidMount() {
    this.getRooms()
    this.getSirens()
    this.getSelf()

    this.authenticate()
  }

  authenticate = () => {
    const recipeUrl = '/api/users/authenticate'
        const requestMetadata = {
            method: 'POST'
        }
        fetch(recipeUrl, requestMetadata).then(res=>{
          if(res.status === 200){
            window.location.hash = "/Feed"
          }else{
            window.location.hash = "/Login"
          }
        })
  }

  getSirens = () => {
    console.log('test')
    const recipeUrl = '/api/users/sirens'
    const requestMetadata = {
        method: 'GET'
    }
    fetch(recipeUrl, requestMetadata)
        .then(async res => {
            let json = await res.json()
            let sirens = {
                null: []
            }
            json.forEach(({_id: room, value: room_sirens}) => {
                sirens[room] = room_sirens
                sirens[null].push(...room_sirens)
            })
            this.setState({sirens: sirens})
        })
        .catch((e) => {
            this.setState({errorMessage: 'Please try again in a few minutes.'})
            console.log(e)
        })
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

  getSelf = () => {
    const recipeUrl = '/api/users/self'
    const requestMetadata = {
        method: 'GET'
    }
    fetch(recipeUrl, requestMetadata)
        .then(res => res.json())
        .then(json => this.setState({
            userData: {
                username: json._id,
                name: json.name
            }
        }))
        .catch(() => {
            this.setState({errorMessage: 'Please try again in a few minutes.'})
        })
    }

  render() {
      return (
      <div className="App" style={{height: '100%'}}>
          <HashRouter>
            <Route path="/Feed" exact component={props=>{
                return <>
                  <TopBar username={this.state.userData ? this.state.userData.username : null}></TopBar>
                    <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                      <div className="col-sm-2" style={{height: '100%'}}>
                        <SideBar rooms={this.state.rooms} selectedRoom={this.state.selectedRoom} updateSelectedRoom={this.updateSelectedRoom}></SideBar>
                      </div>
                      <div className="col-sm-10" style={{height: '100%'}}>
                        <Feed sirens={this.state.sirens} getSirens={this.getSirens} selectedRoom={this.state.selectedRoom} self={this.state.userData ? this.state.userData.username : ''}></Feed>
                      </div>
                    </div>
                  </>
                }} />
            <Route path="/Profile/:id" exact component={props=>{
              return <>
              <TopBar username={this.state.userData ? this.state.userData.username : ''}></TopBar>
                <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                <div className="col-sm-2" style={{height: '100%'}}>
                  <SideBar rooms={this.state.rooms} selectedRoom={this.state.selectedRoom} updateSelectedRoom={this.updateSelectedRoom}></SideBar>
                </div>
                <div className="col-sm-10" style={{height: '100%'}}>
                  <Profile rooms={this.state.rooms} username={this.state.userData ? this.state.userData.username: ''} params={props.match.params}></Profile>
                </div>
                </div>
              </>
            }} />
            <Route path="/Login" exact component={props=>{
              return <>
                <div className="row no-gutters" style={{height: 'calc(100% - 56px)'}}>
                  <div className="col-sm-12">
                    <Login getRooms={this.getRooms} getSelf={this.getSelf}></Login>
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