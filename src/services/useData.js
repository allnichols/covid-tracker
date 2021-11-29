import { useState, useEffect } from "react";
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const statesUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const usaUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json";

export const useDataStates = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(statesUrl).then(topology => {
            const { states } = topology.objects;
            
            setData({
                land: feature(topology, states),
                states: mesh(topology, states, (a, b) => a !== b)
            });
        });
    }, []);

    return data;
}

export const useCountyData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(usaUrl).then( topology => {
            const { states, counties } = topology.objects;
            setData({
                state: feature(topology, states),
                counties: mesh(topology, counties)
            }) 
        })
    }, []);

    return data;
}

