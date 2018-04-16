"use strict"


import axios from 'axios';

//GET CART


export const getCart= ()=>{
    return (dispatch)=>{
        axios.get('/api/cart')
            .then((response)=>{
                dispatch({type: "GET_CART", payload: response.data})
            })
            .catch((err)=>{
                dispatch({type: "GET_CART_REJECTED", payload: err})
            })
    }
}



//ADD TO CART

export const addToCart=(cart, book) =>{
    // make a copy of current cart
    const currentCart = cart;
    const addBook = [...currentCart, ...book]
    console.log(addBook);
    return (dispatch)=>{
        axios({
            method: 'post',
            url: '/api/cart',
            data: addBook,
        })
            .then((response)=>{
            dispatch({type: "ADD_TO_CART", payload: response.data})
        })
            .catch((err)=>{
                dispatch({type: "ADD_TO_CART_REJECTED", payload: err})
            })
    }
};

export const deleteCartItem=(cart) =>{
    return (dispatch)=>{
        axios({
            method: 'post',
            url: '/api/cart',
            data: cart,
        })
            .then((response)=>{
                dispatch({type: "DELETE_CART_ITEM", payload: response.data})
            })
            .catch((err)=>{
                dispatch({type: "DELETE_CART_ITEM_REJECTED", payload: err})
            })
    }

};

export const updateCart=(_id, unit, cart) =>{

    // Create a copy of the current array of books
            const currentBookToUpdate = cart;
// Determine at which index in books array is the book to be deleted
            const indexToUpdate =
                currentBookToUpdate.findIndex(
                    function(book){
                        return book._id === _id;
                    }
                )
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity:
                currentBookToUpdate[indexToUpdate].quantity + unit
            }
            let cartUpdate =
                [...currentBookToUpdate.slice(0,indexToUpdate), newBookToUpdate,
                    ...currentBookToUpdate.slice(indexToUpdate + 1)]
    console.log(cartUpdate, ' updated')

    return (dispatch)=>{
        axios({
            method: 'post',
            url: '/api/cart',
            data: cartUpdate,
        })
            .then((response)=>{
                dispatch({type: "UPDATE_CART", payload: response.data})
            })
            .catch((err)=>{
                dispatch({type: "UPDATE_CART_REJECTED", payload: err})
            })
    }


};