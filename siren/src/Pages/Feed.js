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
        const recipeUrl = '/api/users/like'
        const postBody = {
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

    onComments = (e) => {
        let el = document.querySelector('#comments-' + e.target.id.split('-')[1])
        if (el.classList.contains('collapse')) {
            el.classList.remove('collapse')
        } else {
            el.classList.add('collapse')
        }
    }

    sendNewComment = (id) => {
        const text = document.querySelector('#comments-' + id + '-inp').value
        const recipeUrl = '/api/users/comment'
        const postBody = {
            siren: id,
            room: this.props.sirens[this.props.selectedRoom].filter(siren => siren._id === id)[0].room,
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
                        <Card.Body>{siren.text}</Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Button id={"comments-" + siren._id + "-btn"} variant="outline-dark" style={{marginRight: 15}} onClick={this.onComments}>{siren.comments.length} Comments</Button>
                                <Button id={"likes-" + siren._id + "-btn"} variant={siren.liked ? "success" : "outline-success"} onClick={() => this.onLike(siren._id)}>{siren.likeCount} Likes</Button>
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
                                    <span style={{marginRight: '1rem'}}>
                                        <a href={"#/Profile/"+comment.user}>@{comment.user}</a>
                                        <small style={{marginLeft: '5px'}}>{this.stringifyTimestamp(comment.upload_time)}</small>
                                    </span>
                                    <br />
                                    <span>{comment.text}</span>
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
