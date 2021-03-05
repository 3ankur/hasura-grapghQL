import { useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../../graphql/mutation";
import { GET_CART_LIST } from "../../graphql/queries";
import { BookType } from "../../types";

const StyledCard = styled.div`
background-color: #f1f1f1;
color: #3a3838;
width: 256px;
img{
    width: 100%;
    max-width: 256px;
    height: auto;
}

.container{
    padding:1rem;
}
.btn-buynow{
    background-color: #008B8B;
    border: 1px solid #000;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    width: 100%;
}
`;

export const StyledBookButton = styled.button`
background-color:  palevioletred;
border: 1px solid palevioletred;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
width: 100%;
`;

interface bookProps {
    bookData: BookType,
    isAddedToCart: any
}
const Card = ({ bookData, isAddedToCart }: bookProps) => {
    const userId = '513bf527-0dc7-4ab4-845e-75bb011435db';
    const updateCache = (cache:any, {data} : any)=>{

        const existingCartItem = cache.readQuery({
            query: GET_CART_LIST
        });
        console.log(existingCartItem,"i am chcking");
        const newCartItem = data.insert_cartItems_one;
        cache.writeQuery({
            query: GET_CART_LIST,
            data:{
                cartItems:[newCartItem,...existingCartItem.cartItems]
            }
        })
    }

    const updateCacheForRemoveItem = (cache:any, {data} : any) =>{
        const existingCartItem = cache.readQuery({
            query: GET_CART_LIST
        });
        const removeCartItem = data.delete_cartItems_by_pk;
        console.log(removeCartItem)
        console.log("existing ", existingCartItem)
        cache.writeQuery({
            query: GET_CART_LIST,
            data:{
                cartItems: existingCartItem.cartItems.filter((book:any)=>book.cartId !==removeCartItem.cartId)
            }
        })
    }

    const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, {update: updateCache})
    const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART, {update: updateCacheForRemoveItem});

    return (
        <>
            <StyledCard>
                <Link to={`book/${bookData.bookId}`}><img src={bookData.imgUrl} alt={bookData.title} /></Link>
                <div className="container">
                    <h4>{bookData.title}</h4>
                    <p>{bookData.author}</p>
                    <div>{bookData.price}</div>
                    <div>
                        {
                            isAddedToCart ? <StyledBookButton onClick={() => removeItem({ variables: { cartId: isAddedToCart.cartId } })} >Remove</StyledBookButton> :
                                <StyledBookButton onClick={() => addItemToCart({ variables: { bookId: bookData.bookId, quantity: 1, userId } })}>Buy Now</StyledBookButton>
                        }
                    </div>
                </div>
            </StyledCard>
        </>
    )
}
export default Card;