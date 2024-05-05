import React, { useEffect, useState } from 'react';
import JobCard from '../JobCard/JobCard';
const Api = () => {
    const [responseData, setResponseData] = useState(null);
    
    const fetchData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
            "limit": 10,
            "offset": 0
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };

        try {
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setResponseData(result.jdList);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {responseData && responseData.map(job => (
                <JobCard key={job.jdUid} job={job} />
            ))}
        </>
    );
}

export default API;
