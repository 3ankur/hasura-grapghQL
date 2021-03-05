import { gql } from '@apollo/client';

export const BOOK_LIST = gql`
  query GetBookList($limit: Int!,$offset:Int!) {
    books(limit: $limit,offset:$offset) {
    author
    bookId
    description
    imgUrl
    isbn
    price
    pages
    title
  }
  }
`;

export const BOOK_DETAILS_BY_ID=gql`
query GetBookDetails($bookId: uuid!) {
    books_by_pk(bookId: $bookId){
    author
    bookId
    description
    imgUrl
    isbn
    price
    pages
    title
    }
  }
`;


export const GET_CART_LIST = gql`
query GetCartList {
  cartItems {
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

export const GET_USER_ADDRESS = gql`
query  GetUserAddress {
  userAddress {
    addressId
    addressType
    userId
    fullAddress
    updateDate
  }
}
`;

export const GET_ORDER_DETAILS = gql`
query GetOrder {
  order {
    amount
    orderId
    orderDate
    order_details {
      book {
        author
        bookId
        description
        imgUrl
        isbn
        pages
        price
        title
      }
    }
  }
}

`;