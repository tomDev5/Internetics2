import React, { Component } from 'react'

export default class SideBar extends Component {

    onRoomClick = (e)=>{
        let l = document.getElementById("room-all")
        if(e.target.id === "room-all"){
            l.classList.add("active")
            this.props.updateSelectedRoom(null)
        }else{
            l.classList.remove("active")
        }
        this.props.rooms.forEach(room=>{
            let l = document.getElementById("room-"+room.id)
            if(l.id === e.target.id){
                l.classList.add("active")
                this.props.updateSelectedRoom(room.id)
            }else{
                l.classList.remove("active")
            }
        })
        
    }

    componentDidMount(){
        if(!window.location.href.split('/')[3]){
            //in feed page
            this.props.rooms.forEach(room=>{
                let l = document.getElementById("room-"+room.id)
                l.classList.remove("disabled")
            })
        }else{
            //not in feed page
            this.props.rooms.forEach(room=>{
                let l = document.getElementById("room-"+room.id)
                l.classList.add("disabled")
            })
            let l = document.getElementById("room-all")
            l.setAttribute("style","background-color: #a9d0d9; border-color: #a9d0d9")
        }
    }

    render() {
        return (
            <div className="list-group" style={{margin: 15}}>
                <button id={"room-all"} type="button" className="list-group-item list-group-item-action active" onClick={this.onRoomClick}>
                        All Rooms
                        </button>
                {this.props.rooms.map(room=>{
                    return <button id={"room-"+room.id} type="button" className="list-group-item list-group-item-action" onClick={this.onRoomClick}>
                        {room.name}
                        </button>
                })}
            </div>
        )
    }
}
