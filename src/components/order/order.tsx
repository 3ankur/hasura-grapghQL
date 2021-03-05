import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {GET_ORDER_DETAILS } from "../../graphql/queries";

const StyledOrder = styled.div`
margin: 10px auto;
padding: 25px;

.header{
    background: #f1f1f1;
    padding: 8px;
    font-size: 12px;
}

.order-list{
    border:1px solid #ccc;
    margin: 0px 0px 15px;
}

.basic-details{
    display: flex;
    padding: 10px;
}

.book-overview{
    padding : 5px;
    display: flex;
    flex-direction: column;

    span{
        font-size:12px
    }
}
`;

function Orders() {
    const { loading: orderLoading, data: orderData } = useQuery(GET_ORDER_DETAILS)
    return (
        <StyledOrder>
            {
                orderLoading ? <p>Loading....</p> :
                orderData.order.map((orderItr: any)=>{
                    return  orderItr.order_details.map((oDetails: any) => {
                          const {title, imgUrl, author, price, bookId} = oDetails.book;
                          return (
                              <div className="order-list" key={`${orderItr.orderId}-${bookId}`}>
                                  <div className="header">
                                      <span>Order Place</span> <strong>{new Date(orderItr.orderDate).toDateString()}</strong>
                                      <span style={{ float: "right" }}>Status: <strong>Delivered</strong> </span>
                                  </div>
                                  <div className="basic-details">
                                    <Link to={`/book/${bookId}`} ><img alt="view Book" src={imgUrl} height="50" width="50" /></Link> 
                                      <div className="book-overview">
                                          <h5>{title}</h5>
                                          <span >{author}</span>
                                          <span>$ {price}</span>
                                      </div>
                                  </div>
                              </div>
                          )
                      })
                })
               
            }
            <div>
            </div>
        </StyledOrder>
    )
}
export default Orders;