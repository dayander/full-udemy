'use strict';

import React from 'react';
import {InputGroup, DropdownButton, MenuItem, Image, Col, Row, Well, Panel, FormControl, FormGroup,
    ControlLabel, Button} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postBook, deleteBook, getBooks, resetButton} from "../../actions/booksActions"
import {findDOMNode} from 'react-dom';
import axios from 'axios';



class BooksForm extends React.Component{

    constructor(){
        super();
        this.state ={
            images: [{}],
            img: '',

        }
    }

    componentDidMount(){
        this.props.getBooks();
        axios.get('/api/images')
            .then((response)=>{
            this.setState({images: response.data})
            })
            .catch((err)=>{
                this.setState({images: [], img: ''})
            })

    }

    handleSelect(img){
        console.log('hey');
        this.setState({
            img: '/images/' + img,
        })
    }


    handleSubmit(){
        const book= {
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.images).value,
            price: findDOMNode(this.refs.price).value,
        };
        this.props.postBook(book);
    }
    onDelete(){
        let bookId =
            findDOMNode(this.refs.delete).value;
        this.props.deleteBook(bookId);
    }



    resetForm(){


            this.props.resetButton();
            findDOMNode(this.refs.title).value = "";
            findDOMNode(this.refs.description).value = "";

            findDOMNode(this.refs.price).value = "";
        this.setState({
            img: '',
        })
    }

    render(){

        const booksList =
            this.props.books.map((booksArr , i)=>{
                return (
                    <option key={i}>
                        {booksArr._id}</option>
                )
            });
        const imgList = this.state.images.map((imageArr, i)=>{
                return(
                    <MenuItem onClick={this.handleSelect.bind(this, imageArr.name)} key={i} eventKey={imageArr.name}>
                        {imageArr.name}
                    </MenuItem>
                )
            }, this);




        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6} >
                        <Panel>
                            <InputGroup>
                                <FormControl ref="images" value={this.state.img} type="text"/>
                                    <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title="Select an Image">
                                        {imgList}

                                     </DropdownButton>
                            </InputGroup>

                            <Image src={this.state.img} responsive/>
                        </Panel>


                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>TITLE</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    ref="description"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <Button onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} bsStyle={(!this.props.style)?('primary'): (this.props.style)}>
                                {(!this.props.msg)?('Save Book'): (this.props.msg)}
                            </Button>
                        </Panel>
                        <Panel >
                            <FormGroup
                                controlId="formControlsSelect">
                                <ControlLabel>Select a book id to
                                    delete</ControlLabel>
                                <FormControl ref="delete"
                                             componentClass="select" placeholder="select">
                                    <option
                                        value="select">select</option>
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <img />
                            <Button
                                onClick={this.onDelete.bind(this)}
                                bsStyle="danger">Delete book</Button>

                        </Panel>

                    </Col>



                </Row>
            </Well>
        )
    }
}


const mapStateToProps = (state)=>{
    return{
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation,
    }
};

const mapDispatchToProps= ( dispatch) =>{
    return bindActionCreators(
        {
            postBook,
            deleteBook,
            getBooks,
            resetButton,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);