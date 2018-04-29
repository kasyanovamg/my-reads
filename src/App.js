import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { SearchBooks } from './components/SearchBooks'
import { ListOfBooks } from './components/ListOfBooks'

class BooksApp extends React.Component {
    state = {
        books: [],
    }
    componentDidMount() {
        BooksAPI.getAll()
            .then(data => this.setState({ books: data }))
    }
	shelfSwitch = (book, shelf) => {
       BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll())
      .then((data) => {
        this.setState({ books: data });
      });
    }
    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListOfBooks {...this.state} onShelfSwitch={this.shelfSwitch}/>
                )} />
                <Route path='/search' render={( { history } ) => (
                    <SearchBooks {...this.state} onShelfSwitch={this.shelfSwitch}/>  
                )} />

            </div>    
            )
        }           
}
export default BooksApp
