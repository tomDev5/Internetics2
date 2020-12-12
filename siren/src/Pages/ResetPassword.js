import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default class ResetPassword extends Component {

    state={
        username: '',
    }
    resetPassword = ()=>{//email send should generate new password
        console.log('username: '+this.state.username)
    }

    render() {
        return (
            <div>
                <Container style={{marginTop: '10vw', alignItems: 'center'}}>
                    <Card style={{marginBottom: 15, textAlign: 'left', width: '100%'}}>
                                <Card.Header className="bg-primary" style={{color: '#FFF'}}>Reset Siren™ Password</Card.Header>
                                <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Enter your username:
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="username"  onChange={(e)=>this.setState({username: e.target.value})}/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <Form>
                                            <Form.Group as={Row}>
                                            <Form.Label column sm="2">
                                                <a href="/login">back to login page</a>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Button variant="success" style={{float: 'right'}} onClick={this.resetPassword}>Send email</Button>
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