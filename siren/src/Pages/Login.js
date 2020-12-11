import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default class Login extends Component {

    state={
        username: '',
        password: ''
    }
    login = ()=>{
        console.log('username: '+this.state.username)
        console.log('password: '+this.state.password)
    }

    render() {
        return (
            <div>
                <Container style={{marginTop: '10vw', alignItems: 'center'}}>
                    <Card style={{marginBottom: 15, textAlign: 'left', width: '100%'}}>
                                <Card.Header>Login to Siren™</Card.Header>
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
                                            Password
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="password" onChange={(e)=>this.setState({password: e.target.value})}/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <Form>
                                            <Form.Group as={Row}>
                                            <Form.Label column sm="2">
                                                <a href="/ResetPassword">Forgot Password?</a>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Button variant="success" style={{float: 'right'}} onClick={this.login} disabled={this.state.username === '' || this.state.password === ''}>Login</Button>
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
