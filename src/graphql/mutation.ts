
import { gql } from '@apollo/client';

export const REMOVE_ITEM_FROM_CART = gql`
mutation removeBookFromCart($cartId: uuid!) {
    delete_cartItems_by_pk(cartId: $cartId){
    cartId
   	bookId
    userId
    quantity
    createdDate
    book {
      title
      price
    }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
mutation addBookToCart($bookId: uuid!,$quantity: Int!,$userId: uuid) {
  insert_cartItems_one(object: {bookId: $bookId, quantity: $quantity, userId: $userId}){
    cartId
   	bookId
    userId
    quantity
    createdDate
    book {
      title
      price
    }
  }
}`;

export const UPDATE_CART_QUANTITY = gql`
    mutation updateBookQuantity($cartId: uuid!, $quantity: Int!) {
  update_cartItems_by_pk(pk_columns: {cartId: $cartId}, _set: {quantity: $quantity}) {
    quantity
    cartId
    bookId
    createdDate
    book {
      title
      price
    }
  }
}`;

export const UPDATE_USER_ADDRESS = gql`
mutation updateAddress($addressId: Int!,$fullAddress: String!) {
  update_userAddress_by_pk(pk_columns: {addressId: $addressId}, _set: {fullAddress: $fullAddress}){
    fullAddress
    addressType
    updateDate
    userId
    addressId
  }
}

`;

export const INSERT_USER_ADDRESS= gql`
mutation insetNewAddress($addressType: Int!, $fullAddress: String!, $userId: uuid) {
  insert_userAddress_one(object: {addressType: $addressType, fullAddress: $fullAddress, userId: $userId}){
    fullAddress
    userId
    addressId
    addressType
    updateDate
  }
}
`;



export const CREATE_ORDER=gql`

mutation createOrder($quantity: Int! , $amount: String!,$order_details: order_details_arr_rel_insert_input ) {
  insert_order(objects: {amount: $amount, quantity: $quantity, order_details: $order_details }) {
    affected_rows
  }
}
`;

export const ADD_NEW_BOOK = gql`
  mutation addNewBook($title: String!,$description: String!,$author: String!,$pages: Int!,$price: String!,$isbn:String!,$imgUrl:String){
    insert_books(objects:{title: $title,description:$description,author: $author,pages: $pages, price: $price , isbn:$isbn, imgUrl:$imgUrl} ){
      affected_rows
    }
  }
`;