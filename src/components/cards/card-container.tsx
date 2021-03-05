import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { BOOK_LIST, GET_CART_LIST } from "../../graphql/queries";
import { BookType } from "../../types";
import Card, { StyledBookButton } from "./card";

const StyledContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
display: grid;
grid-gap: 1rem;
padding: 1rem;

@media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const limitOffset = {
  offset: 0,
  limit:5
}
const CardContainer = () => {

  const { loading, data:bookResponse, fetchMore } = useQuery(BOOK_LIST,{
    variables:{
      ...limitOffset
    }
  });
  
  const { loading: isCartLoaded, data: cartData } = useQuery(GET_CART_LIST);
  const { cartItems } = cartData || { cartItems: [] };
  if (loading && isCartLoaded) {
    return (<p>Loading...</p>)
  }
   // console.log(cartData , isCartLoaded,bookResponse,"===>");

  if (bookResponse && !isCartLoaded) {
    const { books } = bookResponse;
    return (
      <>
        <StyledContainer>
          {
            books.map((bookData: BookType) => {
              const isAddedToCart = cartItems.find((i: any) => i.bookId === bookData.bookId)
              return (
                <Card key={bookData.bookId} bookData={bookData} isAddedToCart={isAddedToCart} />
              );
            })

          }
         
        </StyledContainer>
        <StyledBookButton style={{width:"155px", display: "inherit" , margin:"10px auto"}} 
        onClick={()=>{
    limitOffset.offset = limitOffset.offset+5
            fetchMore({
              variables: {
                offset: limitOffset.offset,
                limit: limitOffset.limit
              },
            }).then(fetchMoreResult => {
              console.log(fetchMoreResult);
            })
          }}>
        Load more
        </StyledBookButton>
      </>
    )
  }
  return (<p>Fetching from server...</p>)
}
export default CardContainer;