import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { SearchBooks } from './components/SearchBooks'
import { ListOfBooks } from './components/ListOfBooks'

class BooksApp extends React.Component {
    state = {
        books: {},
    }
    componentDidMount() {
        BooksAPI.getAll()
            .then(books => this.setState({ books: books }))
    }

    shelfSwitch = (e, foundBook) => {
        const books = this.state.books;
        const shelf = e.target.value;
        foundBook.shelf = e.target.value;
        this.setState({
            books
        });

        BooksAPI.update(foundBook, shelf).then(() => {
            this.setState(state => ({
                books: state.books
                    .filter(b => b.id !== foundBook.id)
                    .concat([foundBook])
            }));
        });
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListOfBooks {...this.state} onShelfSwitch={this.shelfSwitch} />
                )} />
                <Route path='/search' render={({ history }) => (
                    <SearchBooks {...this.state} onShelfSwitch={this.shelfSwitch} />
                )} />

            </div>
        )
    }
}
export default BooksApp
