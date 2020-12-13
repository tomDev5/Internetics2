import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class TopBar extends Component {

    state={
        
    }

    logout = () => {
        const recipeUrl = '/api/users/logout'
        const requestMetadata = {
            method: 'POST'
        }
        fetch(recipeUrl, requestMetadata)
            .then(res => window.location.hash = '/Login')
    }

    render() {

        let links = [
            {name: 'Feed', path: '#/Feed'},
            {name: 'Profile', path: '#/Profile/' + this.props.username},
        ]

        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand>Siren</Navbar.Brand>
                    <Nav className="mr-auto"  style={{paddingTop: '.3125rem'}}>
                        {links.map(link => {
                            return <Nav.Link key={link.name} href={link.path} className={window.location.hash.startsWith(link.path) ? 'active' : ''}>{link.name}</Nav.Link>
                        })}
                    </Nav>
                    <Form inline>
                    <Button variant="outline-light" onClick={this.logout}>Logout</Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}
