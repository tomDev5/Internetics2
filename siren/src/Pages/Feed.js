import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default class Feed extends Component {

    state={
        rooms: []
    }

    onLike = (e) => {
        let temp = this.state.messages
        let id = e.target.id.split('-')[1]
        temp[id].liked = !temp[id].liked
        this.setState({messages: temp})
    }

    onComments = (e) => {
        let el = document.querySelector('#comments-' + e.target.id.split('-')[1])
        if (el.classList.contains('collapse')) {
            el.classList.remove('collapse')
        } else {
            el.classList.add('collapse')
        }
    }

    render() {
        if(this.props.rooms){
            let displayMessages = []
            if(!this.props.selectedRoom){
                this.props.rooms.forEach(room=>{
                    room.messages.forEach(message=>{
                        displayMessages.push(message)
                    })
                })
            }else{
                this.props.rooms.filter(room=>room._id === this.props.selectedRoom)[0].messages.forEach(message=>{
                    displayMessages.push(message)
                })
            }
            console.log(displayMessages)
            return (
            <div style={{height: '100%', overflowY: 'scroll'}}>
                <div style={{height: '100%', margin: 15, marginLeft: 0}}>
                    {displayMessages.map((message, i)=>{
                        return <Card key={i} style={{marginBottom: 15, textAlign: 'left'}}>
                            <Card.Header><a href={"#/Profile/"+message.user} style={{textDecoration:'none'}}>@{message.user}</a></Card.Header>
                            <Card.Body>{message.text}</Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <Button id={"comments-" + i + "-btn"} variant="outline-dark" style={{marginRight: 15}} onClick={this.onComments}>{message.comments.length} Comments</Button>
                                    <Button id={"likes-" + i} variant={message.liked ? "success" : "outline-success"} onClick={this.onLike}>{message.likeCount} Likes</Button>
                                </ListGroupItem>
                            
                            <div id={"comments-" + i} className="collapse">
                                <Card.Body>
                                    <Form inline action="/Comments/PostComment" method="post">
                                    <div className="form-group mx-sm-3 mb-2" style={{width: 'calc(100% - 120px)'}}>
                                        <input type="text" className="form-control"
                                               style={{width: '100%'}} name="text" placeholder="Enter a comment..." />
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary mb-2">SEND</button>
                                    </Form>
                                </Card.Body>
                                {message.comments.map(comment => {
                                    return <ListGroupItem>
                                        <span style={{marginRight: '1rem'}}><a href={"#/Profile/"+message.user}>@{comment.user}</a></span>
                                        <span>{comment.text}</span>
                                    </ListGroupItem>
                                })}
                            </div>
                            </ListGroup>
                    </Card>
                    })}
                </div>
            </div>
        )
    }else{
            return(<div></div>)
        }
    }
}
