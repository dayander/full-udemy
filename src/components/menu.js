"use strict"
import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCart } from '../../src/actions/cartActions';

import {Link, withRouter} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
class Menu extends React.Component{
    componentDidMount(){
        this.props.getCart();
    }
    render(){
        return(
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Bs Camera</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/about">
                            <NavItem eventKey={1} href="/about">About</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/contacts">
                        <NavItem eventKey={2} >Contact Us</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/admin">
                        <NavItem eventKey={1} >Admin</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/cart">
                        <NavItem eventKey={2} >Your Cart
                            { (this.props.totalQty > 0)?( // if # of items in cart is > 0
                                <Badge className="badge">
                                    {this.props.totalQty}</Badge>):('')}
                            {/* display the # of items in cart, if zero items, display nothing  :{''} */}
                        </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
function mapStateToProps(state){
    return {
        totalQty: state.cart.totalQty
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart:getCart
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))