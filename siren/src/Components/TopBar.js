import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class TopBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand>Siren</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                    <Form inline>
                    <Button variant="outline-light" href="/login">Logout</Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}
