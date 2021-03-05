import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CART_LIST } from "../../graphql/queries";
import { CREATE_ORDER } from "../../graphql/mutation";

const StyledTable = styled.table`

font-family: arial, sans-serif;
border-collapse: collapse;
width: 100%;


td, th {
border-bottom: 1px solid #ccc;
text-align: left;
padding: 8px;
}

tr:nth-child(4) {
background-color: #dddddd;
}
`;

const PaymentButton = styled.button`


    background-color: palevioletred;
    border: 1px solid palevioletred;
    color: white;
    padding: 10px 20px;
    text-align: center;
    -webkit-text-decoration: none;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    margin: 15px 2px;
    cursor: pointer;

`;

const TAX_VALUE = 7.50
const SHIPPING_CHARGE = 5.00

function calculateTotal(cart: Array<any>=[]) {

    let totalAmount = 0;
    cart.forEach((item:any)=>{
        const { book, quantity } = item;
        totalAmount+= parseInt(book.price) *  parseInt(quantity);
    })
    return totalAmount;
}

function Payment() {
const  history = useHistory();
const {loading: isCartLoading, data:cart} =    useQuery(GET_CART_LIST);
const [submitOrder] = useMutation(CREATE_ORDER)
 const totalPrice = calculateTotal(cart?.cartItems);
 const grandTotal =  SHIPPING_CHARGE + TAX_VALUE + totalPrice;
   if(isCartLoading){
    return <p>loading...</p>
   }
    return (
        <div>
            <h3>Payment Info</h3>
            <StyledTable>
            <tbody>
                <tr>
                    <td>Item Price</td>
                    <td>$ {totalPrice}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>$ {TAX_VALUE}</td>
                </tr>

                <tr>
                    <td>Shipping Charge</td>
                    <td>$ {SHIPPING_CHARGE}</td>
                </tr>

                <tr>
                    <td>Total</td>
                    <td>$ {grandTotal}</td>
                </tr>
                </tbody>
            </StyledTable>
            <PaymentButton onClick={()=>submitOrder({
                variables:{
                    amount: grandTotal.toString(),
                    quantity:  cart?.cartItems.length || 0,
                    order_details:{
                        data: cart?.cartItems.map(({bookId}:any)=>({book_id:bookId}))
                    }
                }
            })}>Checkout</PaymentButton>
            <PaymentButton onClick={()=>history.push('/')}>Cancel</PaymentButton>
        </div>
    );
}
export default Payment;