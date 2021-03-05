import React from "react";
import { ApolloClient,ApolloProvider, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import App from "./App";

const client : ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: 'https://valued-gecko-19.hasura.app/v1/graphql',
    cache: new InMemoryCache({
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
    })
  });

  function AppApolloProvider(){

    return(
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    )

  }
  export default AppApolloProvider;