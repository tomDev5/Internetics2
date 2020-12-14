import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Profile extends Component {

    state={
        self: false,
        userData: {
            username: '',
            name: '',
            description: ''
        },
        nameField: '',
        descField: '',
        new_password: '',
        new_password2: '',
        current_password: '',
        errorMessage: '',
        successMessage: ''
    }

    componentDidMount() {
        const { id } = this.props.params
        this.getUser(id)
    }

    getUser = (id) => {
        const recipeUrl = '/api/users/user?' + new URLSearchParams({
            id: id,
        })
        const requestMetadata = {
            method: 'GET'
        }
        fetch(recipeUrl, requestMetadata)
            .then(res => res.json())
            .then(json => this.setState({
                userData: {
                    username: json._id,
                    name: json.name,
                    description: json.description
                },
                nameField: json.name,
                descField: json.description,
                self: this.props.params.id === this.props.username
            }))
            .catch(() => {
                this.setState({errorMessage: 'Please try again in a few minutes.'})
            })
    }

    updateName = () => {
        this.setState({
            errorMessage: '',
            successMessage: ''
        })
        const recipeUrl = '/api/users/name'
        const postBody = {
            name: this.state.nameField,
            description: this.state.descField
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
                    this.setState({successMessage: 'Name updated successfully.'})
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    updatePassword = () =>{
        this.setState({
            errorMessage: '',
            successMessage: ''
        })
        const recipeUrl = '/api/users/password'
        const postBody = {
            new_password: this.state.new_password,
            new_password2: this.state.new_password2,
            current_password: this.state.current_password
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
                    this.setState({successMessage: 'Password updated successfully.'})
                } else {
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    render() {
        return (
            <div style={{margin: 15, marginLeft: 0}}>
                <Card style={{marginBottom: 15, textAlign: 'left'}}>
                            <Card.Header>
                                <span hidden={!this.state.self}>Your Profile - </span>
                                @{this.state.userData.username}</Card.Header>
                            <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="name" defaultValue={this.state.userData.name} disabled={!this.state.self} onChange={(e)=>this.setState({nameField: e.target.value})}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Description
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="textarea" defaultValue={this.state.userData.description} disabled={!this.state.self} onChange={(e)=>this.setState({descField: e.target.value})}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            </Card.Body>
                            <ListGroup className="list-group-flush" hidden={!this.state.self}>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            <Button variant="success" style={{float: 'right'}}
                                                disabled={
                                                    (this.state.nameField === '' || this.state.nameField === this.state.userData.name)
                                                    &&
                                                    (this.state.descField === '' || this.state.descField === this.state.userData.description)
                                                }
                                                onClick={this.updateName}>
                                                    Update Profile
                                                </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                    </Card>
                    <Card style={{marginBottom: 15, textAlign: 'left'}} hidden={!this.state.self}>
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
                                        <Form.Control type="Password" onChange={(e)=>this.setState({new_password2: e.target.value})}/>
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
                                    <Button variant="success" style={{float: 'right'}}
                                    disabled={this.state.new_password === '' || this.state.new_password2 === '' || this.state.current_password === ''}
                                    onClick={this.updatePassword}>Update Password</Button>
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
            </div>
        )
    }
}
