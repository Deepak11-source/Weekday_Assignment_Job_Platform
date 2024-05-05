import React, { useEffect, useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { useSelector } from 'react-redux';
import { selectOffset } from '../../store/offsetSlice';
const API = () => {
    const [responseData, setResponseData] = useState(null);
    const offset = useSelector(selectOffset);    

    const fetchData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
            "limit": 10,
            "offset": offset
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
    }, [offset]);

    return (
        <>
            <SearchBox jobData={responseData} />
        </>
    );
}

export default API;