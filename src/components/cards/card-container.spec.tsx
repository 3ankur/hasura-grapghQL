import TestRenderer, { ReactTestInstance, ReactTestRenderer, ReactTestRendererJSON, ReactTestRendererNode, ReactTestRendererTree } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import CardContainer from './card-container';
import { BOOK_LIST, GET_CART_LIST } from '../../graphql/queries';
import Card from './card';
import { ReactChild, ReactNode } from 'react';

describe.only('card-container',  () => {
 
   const reqData = [
        {
            request: {
                query: BOOK_LIST,
                variables : {
                    offset: 0,
                    limit:5
                },
            },
            result: {"data": { "books":[
                {
                  "author": "Jane Austen",
                  "bookId": "5cd7b322-50e1-4e66-ab57-d7a156e40b61",
                  "description": "Pride and Prejudice is one of the most popular novels in English literature to illustrate social issues. Featuring a strong female character, Lizzy’s intelligence, charm, and resilience shows off a feminist perspective and social class deconstruction that was rare in the 19th century. If that isn’t enough to want to read this popular classic, how about an enchanting romance story and comedy, too?",
                  "imgUrl": "http://prodimage.images-bn.com/pimages/9781509826872.jpg",
                  "isbn": "TY12U89U123",
                  "price": "26",
                  "pages": 150,
                  "title": "Pride and Prejudice",
                  "__typename": "books"
                }
              ] },
            },
        },

        {
            request: {
                query: GET_CART_LIST,
            },
            result: {"data":{"cartItems":[]}},
        }

        
    ];
    it("should render without failed", async () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={reqData} addTypename={false} >
                <Router><CardContainer /></Router>
            </MockedProvider>
        );

        const tree: (ReactTestRendererJSON |any) = component.toJSON();
        console.log(tree)
        expect(tree.children).toContain('Loading...');
        await new Promise((resolve)=>setTimeout(resolve,0)); 
        const p = component.root.findByType(Card)
        expect(p.props.bookData.title).toContain('Pride and Prejudice');
    })
})