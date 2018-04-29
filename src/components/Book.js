import React, { Component } from 'react'

export class Book extends Component {
    changeShelf = (event) => {
        this.setState({ value: event.target.value });
        this.props.onShelfSwitch(
            this.props.renderedBook,
            event.target.value
        );
    }
    render() {

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${this.props.renderedBook.imageLinks.smallThumbnail}')` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.renderedBook.shelf ? this.props.renderedBook.shelf : 'none'} onChange={this.changeShelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.renderedBook.title}</div>
                <div className="book-authors">{this.props.renderedBook.authors ? this.props.renderedBook.authors.map(author => <div key={author}>{author}</div>) : ''}
                </div>
            </div>
        )
    }
}