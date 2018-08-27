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
    Read : [] ,
    SBarMessage : null ,
  }


show=( massage ='loading...' , milliseconds = 1200  )=>{
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
    this.show()
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
    .catch( err =>this.show('fail to update')  )
  }


  render() {
    const {currentlyReading , wantToRead ,Read , SBarMessage} =this.state
    return (
      <div className="app">
      <BrowserRouter> 
        <Switch> 

          <Route exact path='/'   render={ () => ( 
            <HomePage notify={this.fetchBooks} 
                      currentlyReading ={currentlyReading} 
                      wantToRead ={wantToRead} 
                      Read ={Read} 
            /> 
           )} />

          <Route  path="/search"  render={ () => ( <SearchPage/> )} />

        </Switch>
      </BrowserRouter>

      <SnackBar message={SBarMessage} /> 
      </div>
    )
  }
}

export default BooksApp
