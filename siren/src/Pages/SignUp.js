import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default class SignUp extends Component {
    state={
        username: '',
        name: '',
        password: '',
        password2: ''
    }
    signup = ()=>{
        console.log('username: '+this.state.username)
        console.log('password: '+this.state.password)
        console.log('name')
        console.log('password2')
    }

    render() {
        return (
            <div>
                <Container style={{marginTop: '10vw', alignItems: 'center'}}>
                    <Card style={{marginBottom: 15, textAlign: 'left', width: '100%'}}>
                                <Card.Header>Sign up to Siren™</Card.Header>
                                <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Username:
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="username" onChange={(e)=>this.setState({username: e.target.value})}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Name:
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="username" onChange={(e)=>this.setState({name: e.target.value})}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Password
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="password" onChange={(e)=>this.setState({password: e.target.value})}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Repeat Password
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="password" onChange={(e)=>this.setState({password2: e.target.value})}/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <Form>
                                            <Form.Group as={Row}>
                                            <Col column sm="4">
                                                <a href="/Login">Back to login</a>
                                            </Col>
                                            <Col sm="8">
                                                <Button variant="success" style={{float: 'right'}} onClick={this.signup} 
                                                disabled={this.state.username === '' || this.state.password === '' || this.state.name === '' || this.state.password2 === ''}>
                                                    Sign Up</Button>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Container>
            </div>
        )
    }
}
