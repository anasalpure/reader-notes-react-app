import React from 'react'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter , Switch , Route } from 'react-router-dom'
import './App.css'
import SearchPage from './Pages/SearchPage'
import HomePage from './Pages/HomePage' ;

const storeName ='booksLib';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
      <BrowserRouter> 
        <Switch> 
          <Route exact path='/'   render={ () => ( <HomePage />  )} />
          <Route  path="/search"  render={ () => ( <SearchPage/> )} />
        </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
