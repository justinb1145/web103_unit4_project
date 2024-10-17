import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './EditCar.css'

const EditCar = () => {

    console.log();
    
    const { id } = useParams()
    
    const [car, setCar] = useState({
        id: 0,
        name: '',
        pricepoint: '',
        exterior: '',
        wheels: '',
        roof: '',
        interior: ''
    })

    useEffect(() => {
        const fetchCarById = async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cars/${id}`)
            const data = await response.json()
            console.log(data);
            
            setCar(data)
        }

        fetchCarById()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target

        setCar((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const updateCar = (event) => {
        event.preventDefault()
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(car),
        };

        // fetch(`/gifts/${id}`, options)
        fetch(`${import.meta.env.VITE_SERVER_URL}/cars/${id}`, options)
        window.location = '/'
    }

    const deleteCar = (event) => {
        event.preventDefault()
        const options = {
            method: "DELETE",
        };
        // fetch(`/gifts/${id}`, options)
        fetch(`${import.meta.env.VITE_SERVER_URL}/cars/${id}`, options)
        window.location = '/'
    }

    return (
        <div className='EditCar'>
            <form>
            <label>Name</label> <br />
                <input type='text' id='name' name='name' value={car.name} onChange={handleChange} /><br />
                <br/>

                <label>Image URL</label><br />
                <input type='text' id='image' name='image' value={car.image} onChange={handleChange} /><br />
                <br/>

                <label>Price Point</label><br />
                <input type='text' id='pricepoint' name='pricepoint' value={car.pricepoint} onChange={handleChange} /><br />
                <br/>

                <label>Exterior </label><br />
                <input type="text" id='exterior' name='exterior' value={car.exterior} onChange={handleChange}/><br />
                <br/>

                <label>Roof </label><br />
                <input type='text' id='roof' name='roof' value={car.roof} onChange={handleChange} /><br />
                <br/>

                <label>Wheel </label><br />
                <input type='text' id='wheel' name='wheel' value={car.wheel} onChange={handleChange} /><br />
                <br/>

                <label>Interior </label><br />
                <input type='text' id='interior' name='interior' value={car.interior} onChange={handleChange} /><br />
                <br/>

                <input className='submitButton' type='submit' value='Submit' onClick={updateCar} />
                <button className='deleteButton' onClick={deleteCar}>Delete</button>
            </form>
        </div>
    )
}

export default EditCar
