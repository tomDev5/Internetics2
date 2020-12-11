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
            username: 'tomlubin',
            name: 'Tom Lubin',
            last_updated: '2019___'
        },
        nameField: '',
        new_password: '',
        new_password2: '',
        current_password: ''
    }

    componentDidMount(){
        this.setState({nameField: this.state.userData.name})
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
                                    <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Last Updated: {this.state.userData.last_updated}
                                        </Form.Label>
                                        <Col sm="10">
                                            <Button variant="success" style={{float: 'right'}} disabled={this.state.nameField === '' || this.state.nameField === this.state.userData.name}>Update Name</Button>
                                        </Col>
                                    </Form.Group>
                                    </Form>
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
            </div>
        )
    }
}
