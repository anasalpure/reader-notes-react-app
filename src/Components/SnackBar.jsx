import React from 'react' ;
import './SnackBar.css' ;

function SnackBar({ message , className } ) {

        let classes= 'snack-bar';
        if(message)classes+=' active';
        if (className) classes+= ' '+className ;

        return (
            <div className={classes}  > 
                {message}
            </div>
        )
    
}

export default SnackBar ;