import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import CoffeCard from './CoffeCard';

const Home = () => {
    const initialCoffes = useLoaderData();
    const [coffes, setCoffes] = useState(initialCoffes);
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-20'>
                {
                    coffes.map(coffe=> <CoffeCard coffes={coffes} setCoffes={setCoffes} key={coffe._id} coffe={coffe}></CoffeCard>)
                }
            </div>
        </div>
    );
};

export default Home;