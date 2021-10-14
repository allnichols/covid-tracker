import React, { useState, useEffect } from 'react';
import { json } from 'd3';

const statesUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

export const useData = () => {
    const [data, setData] = useState(null);
    

    useEffect(() => {
        json(statesUrl).then( topology => console.log(topology))
    }, []);

    return data;
}
