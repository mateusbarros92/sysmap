import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_HOST })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Route exact path='/' component={Home} />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
