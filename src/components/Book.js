import React from 'react'

export const Book = ({ renderedBook, onShelfSwitch }) => {
    //console.log(renderedBook.hasOwnProperty('shelf'))
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${renderedBook.imageLinks.smallThumbnail}')` }}></div>
                    <div className="book-shelf-changer">
                        <select value={renderedBook.shelf ? renderedBook.shelf : 'none'} onChange={e => onShelfSwitch(e, renderedBook)}>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{renderedBook.title}</div>
                <div className="book-authors">{renderedBook.authors ? renderedBook.authors.map(author => <div key={author}>{author}</div>) : ''}
                </div>
            </div>
        )  
}