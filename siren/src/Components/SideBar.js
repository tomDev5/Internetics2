import React, { Component } from 'react'

export default class SideBar extends Component {

    state={
        
    }

    onRoomClick = (e)=>{
        let id = e.target.id.split('-')[1]
        if (id === 'all') this.props.updateSelectedRoom(null)
        else this.props.updateSelectedRoom(id)
    }

    render() {
        return (
            <div className="list-group" style={{margin: 15}}>
                <button id={"room-all"} type="button" onClick={this.onRoomClick}
                    className={"list-group-item list-group-item-action" + (!this.props.selectedRoom ? ' active' : '')}
                    disabled={!window.location.hash.startsWith('#/Feed')}>
                    All Rooms
                </button>
                {this.props.rooms.map(room=>{
                    return <button id={"room-"+room._id} type="button" onClick={this.onRoomClick} key={room._id}
                        className={"list-group-item list-group-item-action" + (this.props.selectedRoom === room._id ? ' active' : '')}
                        disabled={!window.location.hash.startsWith('#/Feed')}>
                        {room.name}
                    </button>
                })}
            </div>
        )
    }
}
