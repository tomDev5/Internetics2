import React, { Component } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default class Feed extends Component {

    state={
        errorMessage: '',
        successMessage: '',
        sirens: [],
        newSiren: undefined
    }

    onLike = (id) => {
        const siren = this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === id)[0]
        const recipeUrl = '/api/users/like'
        const postBody = {
            action: siren.liked ? 'pull' : 'push',
            siren: id,
            room: this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === id)[0].room
        }
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }

        fetch(recipeUrl, requestMetadata)
            .then(res => {
                if (res.status === 200) {
                    this.props.getSirens()
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    onComments = (id) => {
        const el = document.querySelector('#comments-' + id)
        const btn = document.querySelector('#comments-' + id + '-btn')
        if (el.classList.contains('collapse')) {
            el.classList.remove('collapse')
            btn.classList.remove('btn-outline-dark')
            btn.classList.add('btn-dark')
        } else {
            el.classList.add('collapse')
            btn.classList.remove('btn-dark')
            btn.classList.add('btn-outline-dark')
        }
    }

    sendNewComment = (id) => {
        const siren = this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === id)[0]
        const text = document.querySelector('#comments-' + id + '-inp').value
        const recipeUrl = '/api/users/comment'
        const postBody = {
            siren: id,
            room: siren.room,
            text: text
        }
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }

        fetch(recipeUrl, requestMetadata)
            .then(res => {
                if (res.status === 200) {
                    this.props.getSirens()
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }
    
    editSiren = (e, id) => {
        const button = document.querySelector('#edit-' + id + '-btn')
        const save = document.querySelector('#save-' + id + '-btn')
        const p = document.querySelector('#body-' + id + ' p')
        const input = document.querySelector('#body-' + id + ' textarea')

        if (p.hidden) {
            if (e.target === save) {
                const siren = this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === id)[0]
                const recipeUrl = '/api/users/siren/edit'
                const postBody = {
                    siren: id,
                    room: siren.room,
                    text: input.value
                }
                const requestMetadata = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postBody)
                }

                fetch(recipeUrl, requestMetadata)
                    .then(res => {
                        if (res.status === 200) {
                            this.props.getSirens()
                        } else {
                            this.setState({errorMessage: 'Please try again in a few minutes.'})
                        }
                    })
            }

            p.hidden = false
            input.hidden = true
            save.hidden = true
            button.innerHTML = 'Edit'
            button.classList.remove('btn-warning')
            button.classList.add('btn-outline-warning')
        } else {
            p.hidden = true
            save.hidden = false
            input.hidden = false
            input.value = p.innerHTML
            button.innerHTML = 'Cancel'
            button.classList.remove('btn-outline-warning')
            button.classList.add('btn-warning')
        }
    }

    deleteSiren = (id) => {
        const siren = this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === id)[0]
        const recipeUrl = '/api/users/siren/delete'
        const postBody = {
            siren: id,
            room: siren.room
        }
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }

        fetch(recipeUrl, requestMetadata)
            .then(res => {
                if (res.status === 200) {
                    this.props.getSirens()
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    editComment = (e, sirenID, commentID) => {
        const button = document.querySelector('#edit-' + commentID + '-btn')
        const save = document.querySelector('#save-' + commentID + '-btn')
        const span = document.querySelectorAll('#body-' + commentID + ' span')[1]
        const input = document.querySelector('#body-' + commentID + ' input')
        console.log(document.querySelectorAll('#body-' + commentID + ' span'))

        if (span.hidden) {
            if (e.target === save) {
                const siren = this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === sirenID)[0]
                const recipeUrl = '/api/users/comment/edit'
                const postBody = {
                    comment: commentID,
                    siren: sirenID,
                    room: siren.room,
                    text: input.value
                }
                const requestMetadata = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postBody)
                }

                fetch(recipeUrl, requestMetadata)
                    .then(res => {
                        if (res.status === 200) {
                            this.props.getSirens()
                        } else {
                            this.setState({errorMessage: 'Please try again in a few minutes.'})
                        }
                    })
            }

            span.hidden = false
            input.hidden = true
            save.hidden = true
            button.innerHTML = 'Edit'
        } else {
            span.hidden = true
            save.hidden = false
            input.hidden = false
            input.value = span.innerHTML
            button.innerHTML = 'Cancel'
        }
    }

    deleteComment = (sirenID, commentID) => {
        const siren = this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === sirenID)[0]
        const recipeUrl = '/api/users/comment/delete'
        const postBody = {
            comment: commentID,
            siren: sirenID,
            room: siren.room
        }
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }

        fetch(recipeUrl, requestMetadata)
            .then(res => {
                if (res.status === 200) {
                    this.props.getSirens()
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    sendNewSiren = () => {
        const recipeUrl = '/api/users/siren'
        const postBody = {
            siren: this.state.newSiren,
            room: this.props.selectedRoom
        }
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }

        fetch(recipeUrl, requestMetadata)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        newSiren: undefined
                    })
                    this.props.getSirens()
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    stringifyTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const europe_date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
        return date.toLocaleTimeString() + ', ' + europe_date
    }

    render() {
        return (
        <div style={{height: '100%', overflowY: 'scroll'}}>
            <div style={{height: '100%', margin: 15, marginLeft: 0}}>
                <Card style={{marginBottom: 15, textAlign: 'left'}}>
                    <Card.Header>New Siren</Card.Header>
                    <Card.Body><Form.Control disabled={!this.props.selectedRoom} as="textarea" rows={3} value={this.state.newSiren} onChange={e => this.setState({newSiren: e.target.value})}/></Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    {!this.props.selectedRoom ?
                                        <div style={{marginTop: '0.5rem'}}>Select a room in order to send the Siren.</div>
                                    : ''}
                                </Col>
                                <Col sm="auto">
                                    <Button onClick={this.sendNewSiren} style={{float: 'right'}} disabled={!this.state.newSiren || !this.props.selectedRoom}>Send</Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>

                <Card style={{marginBottom: 15, textAlign: 'left', width: '100%', backgroundColor: (this.state.errorMessage? '#dc3545': '#28a745'), color: '#FFF'}} hidden={!this.state.errorMessage && !this.state.successMessage}>
                    <Card.Body>
                        <Card.Text>
                            {this.state.errorMessage+this.state.successMessage}
                        </Card.Text>
                    </Card.Body>
                </Card>

                {this.props.sirens[this.props.selectedRoom] ? this.props.sirens[this.props.selectedRoom].sort((a, b) => a.upload_time < b.upload_time).map((siren)=>{
                    return <Card key={siren._id} style={{marginBottom: 15, textAlign: 'left'}}>
                        <Card.Header>
                            <a href={"#/Profile/"+siren.user} style={{textDecoration:'none'}}>@{siren.user}</a>
                            <small style={{marginLeft: '5px'}}>{this.stringifyTimestamp(siren.upload_time)}</small>
                        </Card.Header>
                        <Card.Body id={"body-" + siren._id}>
                            <Form.Control as="textarea" rows={3} hidden/>
                            <p>{siren.text}</p>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Button id={"comments-" + siren._id + "-btn"} variant="outline-dark" style={{marginRight: 15}} onClick={(e) => this.onComments(siren._id)}>{siren.comments.length} Comments</Button>
                                <Button id={"likes-" + siren._id + "-btn"} variant={siren.liked ? "success" : "outline-success"} onClick={(e) => this.onLike(siren._id)}>{siren.likeCount} Likes</Button>
                                <Button id={"delete-" + siren._id + "-btn"} variant={"outline-danger"} style={{float: 'right', marginLeft: 15}} onClick={(e) => this.deleteSiren(siren._id)} hidden={siren.user !== this.props.self}>Delete</Button>
                                <Button id={"save-" + siren._id + "-btn"} variant={"primary"} style={{float: 'right', marginLeft: 15}} onClick={(e) => this.editSiren(e, siren._id)} hidden>Save</Button>
                                <Button id={"edit-" + siren._id + "-btn"} variant={"outline-warning"} style={{float: 'right'}} onClick={(e) => this.editSiren(e, siren._id)} hidden={siren.user !== this.props.self}>Edit</Button>
                            </ListGroupItem>
                        
                        <div id={"comments-" + siren._id} className="collapse">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <input id={"comments-" + siren._id + "-inp"} type="text" className="form-control" style={{width: '100%'}} placeholder="Enter a comment..." />
                                    </Col>
                                    <Col sm="auto">
                                        <Button
                                            variant="primary"
                                            onClick={() => this.sendNewComment(siren._id)}>
                                            Send
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                            {siren.comments.sort((a, b) => a.upload_time < b.upload_time).map(comment => {
                                return <ListGroupItem>
                                    <Row>
                                        <Col id={"body-" + comment._id}>
                                            <span style={{marginRight: '1rem'}}>
                                                <a href={"#/Profile/"+comment.user}>@{comment.user}</a>
                                                <small style={{marginLeft: '5px'}}>{this.stringifyTimestamp(comment.upload_time)}</small>
                                            </span>
                                            <input as="text" hidden/>
                                            <span>{comment.text}</span>
                                        </Col>
                                        <Col style={{marginTop: 5}} sm="auto">
                                            <span className="fake-link" id={"delete-" + comment._id + "-btn"} style={{float: 'right', marginLeft: 15}} onClick={(e) => this.deleteComment(siren._id, comment._id)} hidden={comment.user !== this.props.self}>Delete</span>
                                            <span className="fake-link" id={"save-" + comment._id + "-btn"} style={{float: 'right', marginLeft: 15}} onClick={(e) => this.editComment(e, siren._id, comment._id)} hidden>Save</span>
                                            <span className="fake-link" id={"edit-" + comment._id + "-btn"} style={{float: 'right'}} onClick={(e) => this.editComment(e, siren._id, comment._id)} hidden={comment.user !== this.props.self}>Edit</span>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            })}
                        </div>
                        </ListGroup>
                </Card>
                }) : ''}
            </div>
        </div>
    )
    }
}
