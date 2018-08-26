
import React ,{Component}  from 'react' ;
import * as BooksAPI from '../BooksAPI'
import BookItem from '../Components/BookItem'



class SearchPage extends Component
{
    state ={
        query : 'd' ,
        books : [] ,
    }

    componentDidMount(){
        BooksAPI.getAll()
                .then( books=>this.setState({
                    books
                })
        )
       
    }

    search (event){
        event.target.value
    }

    render (){
        const { books } = this.state ;
        const { onAddNewBook } =this.props ;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick= {()=>onAddNewBook('hi') }>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={ this.search }/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid" >  
                        {books && books.map( (book , index )=><li key={index}> <BookItem book={book} /> </li>  )}     
                    </ol>
                </div>
            </div>
        )
        
    }
    
}

export default SearchPage;

