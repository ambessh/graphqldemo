import React, { Component } from 'react';
import BookList from './components/BookList';
import classes from './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';

const client=new ApolloClient({
  uri:'http://localhost:4000/graphql'
});

class App extends Component {

 
  render() {
    return (
      <ApolloProvider client={client}>
      <div className={classes.App}>
        <em>Ambesh Tiwari's reading list!</em>
        <BookList/>
        <AddBook/>

      </div>
      </ApolloProvider>
    );
  }
}

export default App;
