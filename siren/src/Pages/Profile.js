import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Profile extends Component {

    state={
        userData: {
            username: '',
            name: '',
            last_updated: ''
        },
        nameField: '',
        new_password: '',
        new_password2: '',
        current_password: '',
        errorMessage: ''
    }

    constructor(props) {
        super(props)

        this.getSelf()
    }

    componentDidMount(){
        this.setState({nameField: this.state.userData.name})
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
                    name: json.name,
                    last_updated: '2019__'
                }
            }))
            .catch(() => {
                this.setState({errorMessage: 'Please try again in a few minutes.'})
            })
    }

    updateName = () => {
        const recipeUrl = '/api/users/name'
        const postBody = {
            name: this.state.nameField
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
                    this.getSelf()
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    render() {
        return (
            <div style={{margin: 15, marginLeft: 0}}>
                <Card style={{marginBottom: 15, textAlign: 'left'}}>
                            <Card.Header>Your Profile - @{this.state.userData.username}</Card.Header>
                            <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="name" defaultValue={this.state.userData.name}  onChange={(e)=>this.setState({nameField: e.target.value})}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            <div style={{marginTop: '5px', color: 'grey'}}>
                                                Last Updated: {this.state.userData.last_updated}
                                            </div>
                                        </Col>
                                        <Col>
                                            <Button variant="success" style={{float: 'right'}} disabled={this.state.nameField === '' || this.state.nameField === this.state.userData.name} onClick={this.updateName}>Update Name</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                    </Card>
                    <Card style={{marginBottom: 15, textAlign: 'left'}}>
                            <Card.Header>Update Password</Card.Header>
                            <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        New Password
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="Password" onChange={(e)=>this.setState({new_password: e.target.value})}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Repeat New Password
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="Password" onChange={(e)=>this.setState({new_password_2: e.target.value})}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Current Password
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="Password" onChange={(e)=>this.setState({current_password: e.target.value})}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <Button variant="success" style={{float: 'right'}} disabled={this.state.new_password === '' || this.state.new_password2 === '' || this.state.current_password === ''}>Update Password</Button>
                                </ListGroupItem>
                            </ListGroup>
                    </Card>
                    <Card style={{marginBottom: 15, textAlign: 'left', width: '100%', backgroundColor: '#dc3545', color: '#FFF'}} hidden={this.state.errorMessage.length===0}>
                            <Card.Body>
                            <Card.Text>
                                Error: {this.state.errorMessage}
                            </Card.Text>
                            </Card.Body>
                    </Card>
            </div>
        )
    }
}
