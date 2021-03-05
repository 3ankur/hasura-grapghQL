import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UPDATE_CART_QUANTITY, UPDATE_USER_ADDRESS } from "../../graphql/mutation";
import { GET_CART_LIST, GET_USER_ADDRESS } from "../../graphql/queries";
import Payment from "./payment";

const StyledCart = styled.div`
display: flex;
justify-content: space-between;
margin: 10px auto;
padding: 25px;
 
.cart-book{
    max-height: 500px;
    overflow: auto;
    border: 1px solid #000;
    height: 230px;
}

.cart-left,.cart-right{
    width:50%;
}

h3{
    padding: 0 0 10px;
}

.cart-left button{
    background-color: palevioletred;
    border: 1px solid palevioletred;
    color: white;
    padding: 10px 20px;
    text-align: center;
    -webkit-text-decoration: none;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    margin: 4px 2px;
    cursor: pointer;
}

.cart-item-list{
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
}


.cart-item-list>li{
position: relative;
display: block;
padding: .75rem 1.25rem;
margin-bottom: 5px;
background-color: #fff;
border: 1px solid rgba(0,0,0,.125);
}


`;

const StyledCartButton = styled.div`
display: flex;
    float: right;
`;

const CircleBtn = styled.button`
&:hover{
    border: none;
}

&:focus{
    border: none;
}
&:visited{
    border: none;
}

border-radius: 50%;
padding: 0;
margin: 0;
height: 20px;
width: 20px;
background-color: palevioletred;
border: 1px solid palevioletred;
color: white
`;

function Cart() {

    const { loading: addressLoading, data: addressData } = useQuery(GET_USER_ADDRESS);
    const { loading: isCartLoading, data: cart } = useQuery(GET_CART_LIST);
    const updateCartCache = (cache: any, { data }: any) => {
        const existingCartItem = cache.readQuery({
            query: GET_CART_LIST
        });

        
        console.log(cache);

        const updatedList = existingCartItem.cartItems.map((item: any) => {
            if (item.cartId === data.update_cartItems_by_pk.cartId) {
                return {
                    ...item,
                    quantity: data.update_cartItems_by_pk.quantity
                }
            } else {
                return item;
            }
        });
        cache.writeQuery({
            query: GET_CART_LIST,
            data: {
                cartItems: updatedList
            }
        })
    }

    const updateAddressCache = (cache: any, { data: addressRes }: any) => {
        cache.writeQuery({
            query: GET_USER_ADDRESS,
            data: {
                userAddress: [addressRes.update_userAddress_by_pk]
            }
        })
    }

    const [address, setAddress] = useState('');
    const [updateQuantity] = useMutation(UPDATE_CART_QUANTITY, { update: updateCartCache });
    const [updateUserAddress] = useMutation(UPDATE_USER_ADDRESS, { update: updateAddressCache });
    useEffect(() => {
        if (addressData?.userAddress.length) {
            setAddress(addressData?.userAddress[0]?.fullAddress);
        }
    }, [addressLoading])
    return (
        <StyledCart>
            <div className="cart-left">
                <h3>Shipping Address</h3>
                <div>
                    <textarea onChange={(e) => setAddress(e.target.value)} value={address} rows={15} cols={60} />
                    <div style={{ display: 'flex' }}>
                        <button onClick={() => updateUserAddress({ variables: { addressId: addressData?.userAddress[0]?.addressId, fullAddress: address } })} >Save Address</button>
                        <button>Edit Address</button>
                    </div>
                </div>
            </div>
            <div className="cart-right">
                <h3>Shipping Bag</h3>
                <div className="cart-book">
                    <ul className="cart-item-list">
                        {
                            !isCartLoading && cart && cart.cartItems.map((cartInfo: any) => {
                                const { book, quantity, cartId } = cartInfo;
                                return (
                                    <li key={cartId}>
                                        <span>{book.title}</span>
                                        <StyledCartButton>
                                            <CircleBtn onClick={() => updateQuantity({
                                                variables: { cartId, quantity: quantity - 1 }
                                            })} disabled={quantity === 1} >-</CircleBtn>{quantity}<CircleBtn onClick={() => updateQuantity({
                                                variables: { cartId, quantity: quantity + 1 }
                                            })} >+</CircleBtn>
                                        </StyledCartButton>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Payment />
            </div>
        </StyledCart>
    )
}
export default Cart;
