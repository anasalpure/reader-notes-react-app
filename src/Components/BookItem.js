import React ,{Component} from 'react' ;
import PT from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import './BookItem.css' ;

const VK_SPACE = 32;
const VK_ENTER = 13;

class BookItem extends Component {
    
    static propTypes = {
        book   : PT.object.isRequired ,
        notify : PT.func 
    }
    constructor (props) {
        super(props);
        this.state = {
            shelf : props.book.shelf || 'none' ,
            isOpen : false
        };
    }

    toggle=()=> {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    

    optionChange=(event , shelf)=>{

        //on click event
        if(event.keyCode ) 
            if(event.keyCode == VK_SPACE || event.keyCode == VK_ENTER ) 
            event.preventDefault();
            else
                return
        console.log(event.keyCode)
        
      
        this.setState({
            shelf 
        })
        //update remote data

        BooksAPI.update(this.props.book , shelf )
                .then( data=>console.log('data updated successfully') )

        //re-render if notify function exist
        if(this.props.notify)this.props.notify();
    }

    DropdownHandler =(event)=>{

        //on click event
        if(event.keyCode == undefined ) {
            this.toggle();
        } 
        //on key press event
        else if(event.keyCode == VK_SPACE || event.keyCode == VK_ENTER ) {
            event.preventDefault();
            this.toggle();
        } 
    }

 
    render(){
        const shelf=this.state.shelf;
        const { title , authors,imageLinks ,previewLink}=this.props.book ;
        const dropdownClasses ='dropdown-menu'+ (this.state.isOpen?' show' :' ') ;
        const style={  
                width: 128, 
                height: 193,
                backgroundImage: `url(${imageLinks?imageLinks.thumbnail : '' })` 
            }

        return (
            <div className="book">
                <div className="book-top focusable" tabIndex="0"
                    onClick={this.DropdownHandler} onKeyDown={this.DropdownHandler} 
                    aria-label={title+' book wodget'}
                >
                    <div className="book-cover" style={ style }> </div>
                    <div className="book-shelf-changer" role="button" aria-haspopup="true" >
                        <div tabIndex="-1" 
                            role="menu" 
                            aria-hidden={!this.state.isOpen}
                            className={dropdownClasses } 
                            aria-label='Dropdown menu'
                            > 
                                <a className="menu-item disabled" value="move" >Move to...</a>
                                <a className={'menu-item'+(shelf=='currentlyReading'?' active' :'') }  
                                   tabIndex="0"
                                   onClick={(e)=>this.optionChange(e ,'currentlyReading')} 
                                   onKeyDown={(e)=>this.optionChange(e ,'currentlyReading')} >
                                   Currently Reading
                                </a>
                                <a className={'menu-item'+(shelf=='wantToRead'?' active' :'') }
                                   tabIndex="0"
                                   onClick={(e)=>this.optionChange(e ,'wantToRead')} 
                                   onKeyDown={(e)=>this.optionChange(e ,'wantToRead')} >                                   
                                   Want to Read
                                </a>
                                <a className={'menu-item'+(shelf=='read'?' active' :'') }
                                   tabIndex="0" 
                                   onClick={(e)=>this.optionChange(e ,'read')} 
                                   onKeyDown={(e)=>this.optionChange(e ,'read')} >
                                   Read
                                </a>
                                <a className={'menu-item'+(shelf=='none'?' active' :'') }
                                   tabIndex="0" 
                                   onClick={(e)=>this.optionChange(e ,'none')} 
                                   onKeyDown={(e)=>this.optionChange(e ,'none')} >
                                   None
                                </a>
                        </div>
                    </div>


                </div>
                <div className="book-title">{ title }</div>
                <div className="book-authors">{ authors }</div>
            </div>
        )
    }

}

export default BookItem ;