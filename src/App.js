import React from 'react'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter , Switch , Route } from 'react-router-dom'
import './App.css'
import SearchPage from './Pages/SearchPage'
import HomePage from './Pages/HomePage' ;
import SnackBar from './Components/SnackBar'

const storeName ='booksLib';

class BooksApp extends React.Component {

  state = {
    currentlyReading :[] ,
    wantToRead : [] ,
    read : [] ,
    SBarMessage : null ,
  }


  show=( massage ='loading...' , milliseconds = 1400  )=>{
      this.setState({SBarMessage: massage })
      setTimeout(() => {
          this.setState({SBarMessage:null})
      }, milliseconds);
  }
  

  componentDidMount(){
    this.fetchBooks();
    this.show('content is ready')
  }

  fetchBooks=()=>{
    this.show('loading...' , 4000)
    BooksAPI.getAll()
    .then( books=>{ if(books.error) return ;

                    // filing  arrays with books according to shelf property
                    const read = books.filter(book => book['shelf'] === 'read');
                    const wantToRead = books.filter(book => book['shelf'] === 'wantToRead');
                    const currentlyReading = books.filter(book => book['shelf'] === 'currentlyReading');

                    // shange the state 
                    this.show('ready.' ,600)
                    this.setState({
                      currentlyReading :currentlyReading ,
                      wantToRead : wantToRead ,
                      read : read ,
                    })         
          })
    .catch( err =>this.show('fail to update')  )
  }


  render() {
    const {currentlyReading , wantToRead ,read , SBarMessage} =this.state ;

    return (
      <div className="app">
      <BrowserRouter> 
        <Switch> 

          <Route exact path='/'   render={ () => ( 
            <HomePage notify={this.fetchBooks} 
                      currentlyReading ={currentlyReading} 
                      wantToRead ={wantToRead} 
                      read ={read} 
            /> 
           )} />

          <Route  path="/search"  render={ () => ( 
            <SearchPage notify={this.fetchBooks} 
                        show = { (m , ms)=> this.show(m ,ms)}
                        myBooks={[...currentlyReading ,...wantToRead ,...read ]}
            /> )
          } />

        </Switch>
      </BrowserRouter>

      <SnackBar message={SBarMessage} /> 
      </div>
    )
  }
}

export default BooksApp
