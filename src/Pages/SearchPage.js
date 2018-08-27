
import React ,{Component}  from 'react' ;
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookItem from '../Components/BookItem'

const booksKeywords = [
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
    'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
    'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
    'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama',
    'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First',
    'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen',
    'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage',
    'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry','Production',
    'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction','Shakespeare', 'Singh',
    'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality','Web Development', 'iOS'
]

class SearchPage extends Component
{
    state ={
        books : [] ,
    }


    search = ({target})=>{
        let query = target.value 
        if(query.length>0)
            BooksAPI.search(query)
                .then( books=>{ if(!books.error)this.setState({ books })
                                else this.setState({ books : [] })
                    })
                .catch( err =>this.setState({ books :[] })  )
        else this.setState({ books :[] })
    }

    render (){
        const { books } = this.state ;
        console.log(books)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"  >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={ this.search } list="BooksCats"/>
                        <datalist id="BooksCats"> 
                           {booksKeywords.map( (cat ,index) => <option key={index} value={cat}  /> ) }
                        </datalist>

                    </div>
                </div>
                <div className="search-books-results">
                   <div> There are {books.length} books available </div>
                    <ol className="books-grid" >  
                        {books && books.map( (book , index )=><li key={index}> <BookItem book={book} /> </li>  )}     
                    </ol>
                </div>
            </div>
        )
        
    }
    
}

export default SearchPage;

