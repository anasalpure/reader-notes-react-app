
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
        console.log(this.state.books);
        const { books } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() =>{ } }>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={ this.search }/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid" >  
                        {books && books.map( book=><li> <BookItem book={book} /> </li>  )}     
                    </ol>
                </div>
            </div>
        )
        
    }
    
}

export default SearchPage;

