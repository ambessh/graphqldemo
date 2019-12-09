import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';
import classes from './BookDetails.css';
import AddBook from './AddBook';

class BookDetails extends Component {

displayDetails=()=>{
    console.log(this.props);
    if(!this.props.data.loading){
    const {book}=this.props.data;
    if(book)
    {
      
     let data=<div className={classes.detailsli}>
    <p> {book.name}</p>
    <p> {book.genre}</p>
    <p>{book.author.name}</p>
    <p>books by the this author are...</p>
    {book.author.books.map(el=>{
        return <li key={el.id}>{el.name}</li>
    })}
     </div>
     return data;
      
    }
    else{
        return(<div className={classes.detailsli}>no book selected...</div>);
    }
  
}
else{
   return( <div>Loading...</div>);
}
}


render(){
    return(
        <div className={classes.bd}>
            {this.displayDetails()}
        </div>
    );
}
    
}



export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.details
            }
        }
    }
})(BookDetails);