import React, { useState, useEffect } from 'react';
import { json } from 'd3';

const statesUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const countiesUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
const both = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json';

export const useData = () => {
    const [data, setData] = useState(null);
    

    useEffect(() => {
        json(both).then( topology => console.log(topology))
    }, []);

    return data;
}
