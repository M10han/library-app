import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import Library from "../api/Library.js"
import '../css/app.css'

class BooksComponent extends Component{

    constructor(){
        super()
        this.state ={
            booksData: [],
            offset: 0,
            perPage: 3,
            currentPage: 0,
        }
    }

    fetchData = () => {
        Library.executeLibraryService()
          .then(res => {
            const booksData = res.data
            const books = booksData.slice(this.state.offset, this.state.offset + this.state.perPage)
            
            this.setState({ 
                pageCount: Math.ceil(booksData.length / this.state.perPage),
                books })
          })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.fetchData()
        })
    }

    reserve = (id) => {
        this.setState({
            books: this.state.books.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: (item.quantity - 1) >= 0 ? (item.quantity - 1) : 0};
                } else {
                    return item;
                }
            })
        })
    }
    
    componentDidMount() {
        this.fetchData()
    }
    
    render() {
        return (
          <div className="App">
            {this.state.books && this.state.books.map(book =>
                <React.Fragment key={book.id}>
                <p>{book.id} - {book.title} - {book.author}</p>
                <button onClick={() => this.reserve(book.id)}>Reserve {book.quantity}</button>
                <span>{this.quantity}</span>
                </React.Fragment>
            )}
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
          </div>
        )
    }
}


export default BooksComponent