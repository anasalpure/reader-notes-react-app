
import React ,{Component}  from 'react' ;
import * as BooksAPI from '../BooksAPI'
import BookItem from '../Components/BookItem'
import {Link} from 'react-router-dom'


class HomePage extends Component
{
  state = {
    currentlyReading :[] ,
    wantToRead : [] ,
    Read : [] ,
  }


  componentDidMount(){
    this.fetchBooks();
  }

  fetchBooks=()=>{
    BooksAPI.getAll()
    .then( books=>{ if(books.error) return ;
                    let currentlyReading=  [] ,
                        wantToRead= [] ,
                        Read =[] ;
                    // filing previous three arrays with books according to shelf property
                    for(let book of books){
                      if(book['shelf']){
                        if(book['shelf'] == 'read')
                          Read.push(book);
                        else if(book['shelf'] == 'wantToRead')
                          wantToRead.push(book)
                        else if(book['shelf'] == 'currentlyReading')
                          currentlyReading.push(book)
                      }
                    }
                    // shange the state 
                    this.setState({
                      currentlyReading :currentlyReading ,
                      wantToRead : wantToRead ,
                      Read : Read ,
                    })
                    
          })
    .catch( err =>console.log(err)  )
  }

  render(){
    return(
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                    {this.state.currentlyReading.map( (book ,index) =>
                              <li key={index}> <BookItem notify={this.fetchBooks} book={book}/></li>
                    )} 
         
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                    {this.state.wantToRead.map( (book ,index) =>
                                <li key={index}> <BookItem notify={this.fetchBooks} book={book}/></li>
                    )} 

                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.Read.map( (book ,index) =>
                              <li key={index}> <BookItem notify={this.fetchBooks} book={book}/></li>
                    )} 
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search" >Add a book</Link>
          </div>
      </div>
    )
  }
  
    
}

export default HomePage;