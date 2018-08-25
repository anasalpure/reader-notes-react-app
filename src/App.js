import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { BrowserRouter , Switch , Route } from 'react-router-dom'
import './App.css'
import SearchPage from './Pages/SearchPage'
import HomePage from './Pages/HomePage' ;


class BooksApp extends React.Component {
  state = {

  }
  
  AddBook(book){
    console.log ('hi from AddBook method' , book);
  }

  render() {
    return (
      <div className="app">
      <BrowserRouter> 
        <Switch> 
          <Route exact path='/'   render={ () => (<HomePage/>) } />
          <Route  path="/search"  render={ ({history}) => (
                                  <SearchPage
                                    onAddNewBook={(book) => {
                                      this.AddBook(book)
                                      history.push('/')
                                    }}
                                  />
                                )}
          />
        </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
