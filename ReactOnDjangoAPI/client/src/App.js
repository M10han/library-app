import React, { Component } from 'react'
import BooksComponent from './components/BooksComponent'
import SearchBarComponent from './components/SearchBarComponent'

class App extends Component {
    render(){
        return(
            <div className="App">
                <SearchBarComponent/>
                <BooksComponent/>
            </div>
        )
    }
  }

  export default App
