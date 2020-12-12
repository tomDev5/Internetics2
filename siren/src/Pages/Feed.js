import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default class Feed extends Component {

    state={
        all_messages: [],
        messages: []
    }

    componentDidMount() {
        let all_messages = [
            {id: 'A', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}, {user: 'tomlub', text: 'HELLO!'}], likeCount: 16, liked: true},
            {id: 'B', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: true},
            {id: 'C', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: true},
            {id: 'D', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: true},
            {id: 'E', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
            {id: 'F', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
            {id: 'G', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
            {id: 'H', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
            {id: 'I', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
            {id: 'J', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
            {id: 'K', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
            {id: 'L', user: 'tomlubin', room: 'A', text: 'HELLO!', comments: [{user: 'omerlub', text: 'HI!'}], likeCount: 16, liked: false},
        ]
        let messages = all_messages.filter(message => this.props.selectedRoom === null || message.id === this.props.selectedRoom)

        this.setState({
            all_messages: all_messages,
            messages: messages
        })
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
        console.log(this.state)
        return (
            <div style={{height: '100%', overflowY: 'scroll'}}>
                <div style={{height: '100%', margin: 15, marginLeft: 0}}>
                    {this.state.messages.map((message, i)=>{
                        return <Card key={i} style={{marginBottom: 15, textAlign: 'left'}}>
                            <Card.Header><a href={"/user/"+message.user} style={{textDecoration:'none'}}>@{message.user}</a>, on room {message.room}</Card.Header>
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
                                        <input type="text" class="form-control"
                                               style={{width: '100%'}} name="text" placeholder="Enter a comment..." />
                                    </div>
                                    <button type="submit" class="btn btn-outline-primary mb-2">SEND</button>
                                    </Form>
                                </Card.Body>
                                {message.comments.map(comment => {
                                    return <ListGroupItem>
                                        <span style={{marginRight: '1rem'}}><a href={"/user/"+comment.user}>@{comment.user}</a></span>
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
    }
}
