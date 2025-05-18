import React from 'react';
import { useLoaderData } from 'react-router';

const CoffeDetails = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            This is Details
        </div>
    );
};

export default CoffeDetails;