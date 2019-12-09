import React,{Component} from 'react';

import { graphql } from 'react-apollo';
import classes from './BookList.css';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';



class BookList extends Component {

state={
    selected:null
}


displayBooks=()=>{
    let data=this.props.data;
    let display='loading books...';
    if(!data.loading)
    {
        display=data.books.map(el=>{
            return <li className={classes.bookli} onClick={(e)=>this.setState({selected:el.id})}  key={el.id}>{el.name},{el.genre}</li>;
        });
    }
    return display;
}


    render(){

    return (
        <div>
            <ul className={classes.Book}>
                    {this.displayBooks()}
                    <BookDetails details={this.state.selected}/>
            </ul>
        </div>
    );
                }
}

export default graphql(getBooksQuery)(BookList);