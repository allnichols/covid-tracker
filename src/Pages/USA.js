import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const USA = () => {
    const [data, setData] = useState({});


    useEffect(() => {
        fetch(`https://api.covidactnow.org/v2/counties.json?apiKey=db851a7fa0434131ad626738b50e2c0a`)
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                }, 
                error => {
                    console.log(error);
                }
            )
    }, []);

    return ( 
        <div>
            <p>Hello form the usa page</p>
        </div>
     );
}
 
export default USA;
