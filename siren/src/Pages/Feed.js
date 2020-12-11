import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default class Feed extends Component {

    state={
        messages: [
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            {user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16},
            
        ]
    }

    render() {
        return (
            <div style={{height: '100%', overflowY: 'scroll'}}>
                <div style={{height: '100%', margin: 15, marginLeft: 0}}>
                    {this.state.messages.map((message, i)=>{
                        return <Card key={i} style={{marginBottom: 15, textAlign: 'left'}}>
                            <Card.Header><a href={"/user/"+message.user} style={{textDecoration:'none'}}>@{message.user}</a>, on room {message.room}</Card.Header>
                            <Card.Body>{message.text}</Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <Button variant="outline-dark" style={{marginRight: 15}}>{message.comments.length} Comments</Button>
                                    <Button variant="outline-success">{message.likeCount} Likes</Button>
                                </ListGroupItem>
                            </ListGroup>
                    </Card>
                    })}
                </div>
            </div>
        )
    }
}
