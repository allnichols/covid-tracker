import { useState, useEffect } from "react";
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const statesUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const usaUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json";

export const useDataStates = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(statesUrl).then(data => {
            const states = feature(data, data.objects.states);
            const counties = mesh(data, data.objects.states, (a, b) => a !== b);
            setData({ states, counties });
        });
    }, []);

    return data;
}

export const useDataCounties = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(usaUrl).then(data => {
            const counties = feature(data, data.objects.counties);
            setData(counties);
        });
    }, []);

    return data;
}

