import React ,{Component} from 'react' ;
import PT from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import './SnackBar.css' ;



class BookItem extends Component {
    
    static propTypes = {
        book   : PT.object.isRequired ,
        notify : PT.func 
    }
    constructor (props) {
        super(props);
        this.state = {
            shelf : props.book.shelf || 'none'
        };
    }
    

    optionChange=({target})=>{
        let shelf=target.value
        this.setState({
            shelf 
        })
        //update remote data
        console.log(this.props.book , shelf )
        BooksAPI.update(this.props.book , shelf )
                .then( data=>console.log(data) )

        //re-render if notify function exist
        if(this.props.notify)this.props.notify();
    }

 
    render(){
       
        const {id, title,subtitle,shelf,authors,categories,description,imageLinks ,language ,previewLink}=this.props.book ;
        const style={  
                width: 128, 
                height: 193,
                backgroundImage: `url(${imageLinks?imageLinks.thumbnail : '' })` 
            }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={ style }>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={this.optionChange} >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead" >Want to Read</option>
                        <option value="read" >Read</option>
                        <option value="none" >None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ title }</div>
                <div className="book-authors">{ authors }</div>
            </div>
        )
    }

}

export default BookItem ;