import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const usa = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json';

export const useData = () => {
    const [data, setData] = useState(null);
    

    useEffect(() => {
        json(usa).then( topology => {
            const { states, counties } = topology.objects;
            setData({
                state: feature(topology, states),
                counties: mesh(topology, counties)
            }) 
        })
    }, []);

    return data;
}
