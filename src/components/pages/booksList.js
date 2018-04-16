"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel,Grid, Col, Row, Button} from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './BooksForm';
import Cart from './cart';



class BooksList extends React.Component{
    componentDidMount(){
        this.props.getBooks();

}
    render(){
        const booksList = this.props.books.map((books, i)=>{
            return(
                <Col xs={12} sm={6} md={4} key={i}>
                    <BookItem  _id={books._id} title={books.title} images={books.images} description={books.description} price={books.price} />

                </Col>
            )
        });
        return(
           <Grid>
               <Row>
                   <Carousel>
                       <Carousel.Item>
                           <img width={900} height={500} alt="900x500" src="/images/home1.png" />
                           <Carousel.Caption>
                               <h3>First slide label</h3>
                               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                           </Carousel.Caption>
                       </Carousel.Item>
                       <Carousel.Item>
                           <img width={900} height={500} alt="900x500" src="/images/home2.jpg" />
                           <Carousel.Caption>
                               <h3>Second slide label</h3>
                               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                           </Carousel.Caption>
                       </Carousel.Item>

                   </Carousel>
               </Row>
               <Row style={{marginTop: '15px'}}>

                   {booksList}
               </Row>
           </Grid>
        )
    }

}


const mapStateToProps = (state)=>{
    return{
        books: state.books.books
    }
};

const mapDistpatchTopProps = (dispatch) =>{
  return bindActionCreators({getBooks: getBooks}, dispatch)
};

export default connect(mapStateToProps, mapDistpatchTopProps)(BooksList);