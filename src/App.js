import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './Pages/SearchPage'
import HomePage from './Pages/HomePage' ;


class BooksApp extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
       
        <SearchPage />
    
        <HomePage />
   
      </div>
    )
  }
}

export default BooksApp
