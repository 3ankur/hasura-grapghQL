import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_NEW_BOOK } from "../graphql/mutation";
import styled from "styled-components";


const StyledForm = styled.div`
padding:10px;
margin:10px;

.form-input{
    padding : 8px;
    margin: 8px;
}
`;

function AddBook() {

    const [book, setBookDetails] = useState({
        title: '',
        description: '',
        author: '',
        pages: '',
        price: '',
        isbn: '',
        imgUrl: ''
    });

    const [addBookFn] = useMutation(ADD_NEW_BOOK);


    const addNewBook = (e: any) => {
        e.preventDefault();
        console.log(book);
        //books_insert_input
        addBookFn({
            variables: {
                ...book
            }
        })

    }

    const changeInputHandler = (e: any) => {

        setBookDetails((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <StyledForm>
            <form onSubmit={addNewBook}>
                <div className="form-input">
                    <label>Title</label>
                    <input type="text" onChange={changeInputHandler} name="title" value={book.title} />
                </div>
                <div className="form-input">
                    <label>Description</label>
                    <input type="text" onChange={changeInputHandler} name="description" value={book.description} />
                </div>
                <div className="form-input">
                    <label>Author</label>
                    <input type="text" onChange={changeInputHandler} name="author" value={book.author} />
                </div>

                <div className="form-input">
                    <label>pages</label>
                    <input type="text" onChange={changeInputHandler} name="pages" value={book.pages} />
                </div>

                <div className="form-input">
                    <label>price</label>
                    <input type="text" onChange={changeInputHandler} name="price" value={book.price} />
                </div>
                <div className="form-input">
                    <label>ISBN</label>
                    <input type="text" onChange={changeInputHandler} name="isbn" value={book.isbn} />
                </div>

                <div className="form-input">
                    <label>imgUrl</label>
                    <input type="text" onChange={changeInputHandler} name="imgUrl" value={book.imgUrl} />
                </div>
                <button>Save</button>
            </form>
        </StyledForm>
    )
}
export default AddBook;