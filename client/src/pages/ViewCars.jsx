import React, {useState, useEffect} from 'react';
import "./CarDetails.css"
import { useParams } from 'react-router-dom';

const CarDetails = ({data}) => {

    const [car, setCar] = useState({id: 0, name: "", pricepoint: "", exterior: "", roof: "", wheels: "", interior: ""})
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const {id} = useParams()

    useEffect(() => {
        const fetchCarById = async() => {
            try {
                const response = await fetch(`http://localhost:3001/cars/${id}`);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                console.log(result);
                setGift(result);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            } 
        };
    
        fetchCarById()

    }, [data, id]);


    return (
        <div className="CarDetails">
            <main id="car-content" class="car-info">
                <div class="image-container">
                    <img id="image" src={car.image} />
                </div>
                <div class="car-details">
                    <h2 id="name">{car.name}</h2>
                    <p id="submittedBy">{'Pricepoint: ' + car.pricepoint}</p>
                    <p id="pricePoint">{'exterior: ' + car.exterior}</p>
                    <p id="audience">{'roof: ' + car.roof}</p>
                    <p id="audience">{'wheels: ' + car.wheels}</p>
                    <p id="interior">{car.interior}</p>
                </div>
            </main>
        </div>
    )
}

export default CarDetails