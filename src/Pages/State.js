import React from 'react';
import { useLocation } from 'react-router-dom';

const State = () => {
    let {pathname} = useLocation();
    
    return ( 
        <div>
            <h1>{pathname}</h1>
        </div>
     );
}
 
export default State;