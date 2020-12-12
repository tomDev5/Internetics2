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
        password: '',
        errorMessage: ''
    }
    login = ()=>{
        const recipeUrl = 'http://localhost:8080/users/login';
        const postBody = {
            username: this.state.username,
            password: this.state.password
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(recipeUrl, requestMetadata)
            .then(res => {
                console.log(res)
                if(res.status === 401){
                    this.setState({errorMessage: 'Username and/or password are incorrect.'})
                }else if(res.status !== 200){
                    this.setState({errorMessage: 'Please try again in a few minutes.'})
                }
            })
    }

    render() {
        return (
            <div>
                <Container style={{marginTop: '10vw', alignItems: 'center'}}>
                    <Card style={{marginBottom: 15, textAlign: 'left', width: '100%'}}>
                                <Card.Header className="bg-primary light" style={{color: '#FFF'}}>Login to Siren™</Card.Header>
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
                                            <Form.Label column sm="4">
                                                <a href="/signup">Sign Up</a>
                                                <span>  ·  </span>
                                                <a href="/ResetPassword">Forgot Password?</a>
                                            </Form.Label>
                                            <Col sm="8">
                                                <Button variant="success" style={{float: 'right'}} onClick={this.login} disabled={this.state.username === '' || this.state.password === ''}>Login</Button>
                                            </Col>
                                        </Form.Group>
                                    </Form>
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
                    </Container>
            </div>
        )
    }
}
