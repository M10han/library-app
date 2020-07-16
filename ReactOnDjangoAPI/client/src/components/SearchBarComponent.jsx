import React, { Component } from 'react'
import NamesContainer from './NamesContainer'
import Library from '../api/Library.js'

class SearchBarComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            names: [],
            searchTerm: ''
        }
    }

    retrieveData = () => {
        Library.executeLibraryService()
        .then(res => {
            const booksData = res.data
            var books = booksData.map(({title}) => title)
            this.setState({
                names: books
            })
        })
    }

    editSearchTerm = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    dynamicSearch = () => {
        return this.state.names.filter(name => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    componentDidMount() {
        this.retrieveData()
    }

    render(){
        return(
            <div style={{textAlign:'center', paddingTop:'2vh'}}>
                <input type="text" value = {this.state.searchTerm} onChange = {this.editSearchTerm} placeholder="Search for a book"/>
                <NamesContainer names = {this.dynamicSearch()}/>
            </div>
        )
    }
}

export default SearchBarComponent