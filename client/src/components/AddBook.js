import React,{Component} from 'react';

import {graphql} from 'react-apollo';
import {flowRight} from 'lodash';
import classes from './AddBook.css';
import {addBookMutation,addAuthorQuery,getBooksQuery} from '../queries/queries';



 class AddBook extends Component{
    
    state={
        name:'',
        genre:'',
        authorId:''
    }
    
    displayAuth=()=>{

        const data=this.props.addAuthorQuery;
        let display=<option disabled>'loading authors...'</option>;
        if(!data.loading)
        {
            display=data.authors.map(el=>{
               return <option key={el.id} value={el.id}>{el.name}</option>; 
            })
        }
        return display;
    }

    submitForm=(event)=>{
        event.preventDefault();
        this.props.addBookMutation({
            variables:{
             name:this.state.name,
             genre:this.state.genre,
             authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        });
    }
    
    render(){

 return(
    <div className={classes.container}>
    <form onSubmit={this.submitForm}>
      <div className={classes.row}>
        <div className={classes.c25}>
          <label htmlFor="bn">Book Name</label>
        </div>
        <div className={classes.c75}>
          <input type="text" id="bn"  onChange={(event)=>this.setState({name:event.target.value})}></input>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.c25}>
          <label htmlFor="g">Genre</label>
        </div>
        <div className={classes.c75}>
          <input type="text" id="g" onChange={(event)=>this.setState({genre:event.target.value})}></input>
        </div>
      </div>
     <div className={classes.row}>

        <div className={classes.c25}>
        <label htmlFor="country">Select Author</label>
        </div>
        <div className={classes.c75}>
        <select id="country" onChange={(event)=>this.setState({authorId:event.target.value})} >
            <option>Select Authors</option>
           {this.displayAuth()}

          </select>
        </div>
     </div>
     
      
      <div className={classes.row}>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
);
     }
}


export default flowRight(
graphql(addAuthorQuery,{name:"addAuthorQuery"}),
graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);