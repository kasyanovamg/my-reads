import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Book } from './Book'

import * as BooksAPI from '../BooksAPI'


export class SearchBooks extends Component {
    state = {
        query: '',
        searchedBooks: [],
    }

    matchShelf = (book) => {
        let shelf = this.props.books.filter(b => book.id === b.id)
        return book.shelf = shelf.length ? shelf[0].shelf : 'none'
    }

    updateQuery = query => {
        this.setState({ query: query })
        if (query) {
            BooksAPI.search(query).then(books => {
                if (books.length > 0) {
                    books.map(searchedBook => this.matchShelf(searchedBook));
                    this.setState({ searchedBooks: books })
                } else {
                    this.setState({ searchedBooks: [] })
                }
            })
        }
    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">

                    {this.state.query.length > 0 &&
                        <ol className="books-grid">
                            {this.state.searchedBooks.length > 0 && this.state.searchedBooks.map(book => <li key={book.id}><Book onShelfSwitch={this.props.onShelfSwitch} renderedBook={book} /></li>)}
                        </ol>}
                </div>
            </div>
        )
    }
}

