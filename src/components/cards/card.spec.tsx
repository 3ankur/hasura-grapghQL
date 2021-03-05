
import TestRenderer, { ReactTestInstance, ReactTestRendererJSON } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from './card';
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from '../../graphql/mutation';
import { GET_CART_LIST } from '../../graphql/queries';
import { InMemoryCache } from '@apollo/client';

describe('Card Component',()=>{
    const reqData : Array<any>= [];
    const book =   {
        "author": "Jane Austen",
        "bookId": "5cd7b322-50e1-4e66-ab57-d7a156e40b61",
        "description": "Pride and Prejudice is one of the most popular novels in English literature to illustrate social issues. Featuring a strong female character, Lizzy’s intelligence, charm, and resilience shows off a feminist perspective and social class deconstruction that was rare in the 19th century. If that isn’t enough to want to read this popular classic, how about an enchanting romance story and comedy, too?",
        "imgUrl": "http://prodimage.images-bn.com/pimages/9781509826872.jpg",
        "isbn": "TY12U89U123",
        "price": "26",
        "pages": "150",
        "title": "Pride and Prejudice",
      };
      const cacheIns =new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              books: {
                // Don't cache separate results based on
                // any of this field's arguments.
                keyArgs: false,
                // Concatenate the incoming list items with
                // the existing list items.
                merge(existing = [], incoming) {
                  return [...existing, ...incoming];
                },
              }
            }
          }
        }
      }).restore({
        ROOT_QUERY: {
            cartItems:[]
        }
      });

    it('should render the card component',()=>{
        const component = TestRenderer.create(
            <MockedProvider mocks={reqData} addTypename={false} >
                <Router><Card bookData={book} isAddedToCart={false} /></Router>
            </MockedProvider>
        );

        const tree: ReactTestInstance = component.root.findByType('h4');
        expect(tree.children.join("")).toContain('Pride and Prejudice');
    });

    it('should add to cart',async ()=>{

        const mockAddCartRes = [
            {
              request: {
                query: ADD_ITEM_TO_CART,
                variables:  { bookId: '5cd7b322-50e1-4e66-ab57-d7a156e40b61', quantity: 1, userId:"513bf527-0dc7-4ab4-845e-75bb011435db" },
              },
              result: {"data":{"insert_cartItems_one":{"cartId":"85a83b7c-be4a-4359-9a54-9ae7374bb28e","bookId":"5cd7b322-50e1-4e66-ab57-d7a156e40b61","userId":"513bf527-0dc7-4ab4-845e-75bb011435db","quantity":1,"createdDate":"2021-03-03T09:17:37.332475","book":{"title":"Pride and Prejudice","price":"26","__typename":"books"},"__typename":"cartItems"}}},
            }
          ];

          const component = TestRenderer.create(
            <MockedProvider mocks={mockAddCartRes} addTypename={true}  cache={cacheIns} >
                <Router><Card bookData={book} isAddedToCart={false} /></Router>
            </MockedProvider>
        );

        const button = component.root.findByType('button');
        button.props.onClick();
         await new Promise((resolve)=>setTimeout(resolve,0));
          const {cartItems}:any = cacheIns.readQuery({
              query: GET_CART_LIST
          });
          expect(cartItems[0].book.title).toEqual('Pride and Prejudice')
    });
    
    it('should remove from cart',async ()=>{
        const cacheIs = new InMemoryCache({
            typePolicies: {
              Query: {
                fields: {
                  books: {
                    // Don't cache separate results based on
                    // any of this field's arguments.
                    keyArgs: false,
                    // Concatenate the incoming list items with
                    // the existing list items.
                    merge(existing = [], incoming:[]) {
                        console.log("its the merge function ",existing);
                      return [...existing, ...incoming];
                    },
                  }
                }
              }
            }
          }).restore({
            ROOT_QUERY: {
                cartItems:[{
                    "__typename": "cartItems",
                    "cartId": "f3b8e895-4d31-4d3f-aad6-43f16bdcd215",
                    "bookId": "5cd7b322-50e1-4e66-ab57-d7a156e40b61",
                    "userId": "513bf527-0dc7-4ab4-845e-75bb011435db",
                    "quantity": 1,
                    "createdDate": "2021-03-03T11:13:57.010326",
                    "book": {
                      "__typename": "books",
                      "title": "Pride and Prejudice",
                      "price": "26"
                    }
                  }]
            }
          });
        const mockAddCartRes = [
            {
              request: {
                query: REMOVE_ITEM_FROM_CART,
                variables:  {  "cartId": "f3b8e895-4d31-4d3f-aad6-43f16bdcd215"},
              },
              result: {"data":{"delete_cartItems_by_pk":{"cartId":"f3b8e895-4d31-4d3f-aad6-43f16bdcd215","bookId":"5cd7b322-50e1-4e66-ab57-d7a156e40b61","userId":"513bf527-0dc7-4ab4-845e-75bb011435db","quantity":1,"createdDate":"2021-03-03T11:13:57.010326","book":{"title":"Pride and Prejudice","price":"26","__typename":"books"},"__typename":"cartItems"}}}
            }
            ];

          const component = TestRenderer.create(
            <MockedProvider mocks={mockAddCartRes} addTypename={true}  cache={cacheIs} >
                <Router><Card bookData={book} isAddedToCart={{cartId:'f3b8e895-4d31-4d3f-aad6-43f16bdcd215'}} /></Router>
            </MockedProvider>
        );

        const button = component.root.findByType('button');
        console.log(button.children);
        button.props.onClick();
        await new Promise((resolve)=>setTimeout(resolve,0));
       
        const {cartItems}:any = cacheIns.readQuery({
            query: GET_CART_LIST
        });
        // await new Promise((resolve)=>setTimeout(resolve,0));
        // expect(cartItems.length).toEqual(0)
    });
});