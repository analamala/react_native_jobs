import {useState, useEffect} from "react";
import axios from 'axios';
import searchJobsResponse from '../mocks/searchJobsResponse.json';
import searchRemoteJobsResponse from '../mocks/searchRemoteJobsResponse.json';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'x-rapidapi-key': '',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
        params: {...query}
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            //TODO: uncomment below 3 lines and comment the entire setTimeout block. Also uncomment code in finally
            // const response = await axios.request(options);
            // setData(response.data.data);
            // setIsLoading(false);
            let response = {data: null}
            setTimeout(() => {
                if (endpoint.indexOf('search/') !== -1) {
                    response.data = searchRemoteJobsResponse;
                } else if (endpoint.indexOf('search') !== -1) {
                    response.data = searchJobsResponse;
                } else if (endpoint.indexOf('job-details') !== -1) {
                    // const jobListJson = JSON.parse(searchJobsResponse);
                    response.data = {
                        data: null
                    }
                    let mockRespConcat
                      = searchRemoteJobsResponse.data.concat(searchJobsResponse.data);
                    console.log('Mock contat response');
                    console.log(mockRespConcat);
                    response.data.data = [mockRespConcat.find(job => {
                        return query.job_id === job.job_id
                    })];
                    console.log(response.data.data);
                }
                setData(response.data.data);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            setError(error);
            console.log(error);
            alert('There is an error');
        } finally {
            // setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch}
}

export default useFetch;