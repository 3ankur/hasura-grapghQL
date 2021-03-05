import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../../graphql/mutation";
import { BOOK_DETAILS_BY_ID, GET_CART_LIST } from "../../graphql/queries";
import { StyledBookButton } from "../cards/card";
const StyledBookContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`;

const StyledBookImage = styled.div`
position: relative;
width: 100%;
padding-right: 15px;
padding-left: 15px;

img{
    width:15rem;
}

@media (min-width: 768px)
 {
    flex: 0 0 25%;
    max-width: 50%;
}
`;

const StyledBookDetails = styled.div`


position: relative;
width: 100%;
padding-right: 15px;
padding-left: 15px;

p{
    padding : 0.5rem;
}

h2{
    padding : 0.5rem;
}

.about-book{
    margin-top:0.5rem;
}

@media (min-width: 768px)
 {
    flex: 0 0 50%;
    max-width: 50%;
}

`;


const StyledMain = styled.main`
flex: 0 0 83.333333%;
max-width: 83.333333%;
margin: 2rem auto; 
`;

type bookParam ={
    id: string
}

function BookDetailsContainer() {
    const param : bookParam  = useParams();
    const {data,loading} = useQuery(BOOK_DETAILS_BY_ID,{
        variables:{
            bookId: param.id
        }
    });

    const {data:cartData} = useQuery(GET_CART_LIST);
    //for cart id 
    let cartId : string ='';
    if(cartData?.cartItems.length){
       const isExistsInCart =  cartData.cartItems.find((c:any)=>c.bookId===param.id);
       cartId = isExistsInCart ?  isExistsInCart.cartId : null;
    }

    const userId = '513bf527-0dc7-4ab4-845e-75bb011435db';
    const updateCache = (cache:any, {data} : any)=>{

        const existingCartItem = cache.readQuery({
            query: GET_CART_LIST
        });
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
        cache.writeQuery({
            query: GET_CART_LIST,
            data:{
                cartItems: existingCartItem.cartItems.filter((book:any)=>book.cartId !==removeCartItem.cartId)
            }
        })
    }

    const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, {update: updateCache})
    const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART, {update: updateCacheForRemoveItem});

    if(loading){
        return(<p>Loading content....</p>);
    }

    if(data){
        const {books_by_pk: bookDetails} = data;
    return (
            <StyledMain>
                <section>
                    <StyledBookContainer>
                        <StyledBookImage>
                            <img src={bookDetails.imgUrl} alt="Card image" />
                        </StyledBookImage>
                        <StyledBookDetails>
                            <h2 >{bookDetails.title}</h2>
                            <p>Price <span><strong>{bookDetails.price}</strong></span></p>
                            <p>Author Name <span><strong>{bookDetails.author}</strong></span></p>
                            <p>Pages <span><strong>{bookDetails.pages}</strong></span></p>
                            <p>ISBN<span> <strong>{bookDetails.isbn}</strong></span></p>
                            <div style={{ display: 'flex' }}>
    
                                {
                                    cartId ? (<StyledBookButton onClick={()=>removeItem({ variables: { cartId} })}>
                                        <span>Remove</span>
                                    </StyledBookButton>) : <StyledBookButton onClick={()=> addItemToCart({ variables: { bookId: param.id, quantity: 1, userId } })}>
                                    <span>Add to Cart</span>
                                </StyledBookButton>
                                }
                                <StyledBookButton>
                                    <span>Buy Now</span>
                                </StyledBookButton>
                            </div>
                            <div className="about-book">
                                <h3>About book</h3>
                                <p>
                                {bookDetails.description}
                            </p>
                            </div>
                        </StyledBookDetails>
                    </StyledBookContainer>
                </section>
            </StyledMain>
    
        )
    }

    
    
    return <div>Fetching from server......</div>
}
export default BookDetailsContainer;