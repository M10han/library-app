import axios from 'axios';

class Library{
    executeLibraryService(){
        return axios.get('/library')
    }
}

export default new Library()