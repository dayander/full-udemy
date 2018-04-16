"use strict";

//Cart reducers

export const cartReducer=(state={cart: []}, action) =>{
    switch(action.type) {
        case "GET_CART":
            return{...state.cart,
                cart:action.payload.cart,
                totalAmount: totals(action.payload.cart).total,
                totalQty: totals(action.payload.cart).qty,
            }


        case "ADD_TO_CART":

            return {
                cart: [...action.payload],
                totalAmount: totals([...state.cart, ...action.payload]).total
            };

            break;


        case "DELETE_CART_ITEM":

            return {
                cart: action.payload,
                totalAmount: totals(action.payload).total



            };

            break;
        case "UPDATE_CART":
// // Create a copy of the current array of books
//             const currentBookToUpdate =
//                 [...state.cart]
// // Determine at which index in books array is the book to be deleted
//             const indexToUpdate =
//                 currentBookToUpdate.findIndex(
//                     function(book){
//                         return book._id === action._id;
//                     }
//                 )
//             const newBookToUpdate = {
//                 ...currentBookToUpdate[indexToUpdate],
//                 quantity:
//                 currentBookToUpdate[indexToUpdate].quantity +
//                 action.unit
//             }
//             let cartUpdate =
//                 [...currentBookToUpdate.slice(0,indexToUpdate), newBookToUpdate,
//                     ...currentBookToUpdate.slice(indexToUpdate +
//                         1)]

            return {...state,
                cart:action.payload,
                totalAmount: totals(action.payload).total,
                totalQty: totals(action.payload).qty,
            }
            break;
    };
    return state

};


export const totals = (payloadArr) => {

    const totalAmount = payloadArr.map((cartArr)=>{
        return cartArr.price * cartArr.quantity;
    }).reduce((a,b)=>{
        return a + b
    }, 0)
    const totalQty =
        payloadArr.map(function(qty){
            return qty.quantity;
        }).reduce(function(a, b) {
            return a + b;
        }, 0);
    console.log(totalAmount.toFixed(2))
    return {total:totalAmount.toFixed(2),
        qty:totalQty}
}



