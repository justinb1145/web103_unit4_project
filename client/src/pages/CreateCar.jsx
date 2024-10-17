import { useState } from 'react'
import './CreateCar.css'

const CreateCar = () => {

   

    const [car, setCar] = useState({
        id: 0, name: '',
        pricepoint: '',
        exterior: '',
        image: '',
        roof: '',
        wheels: '',
        interior: ''
    })
    
    const handleChange = (event) => {
        const { name, value } = event.target

        setCar( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }    

    const createCar = (event) => {
        event.preventDefault()
        const options = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        };        
        const response = fetch('/cars', options)
        window.location = '/'
    }

    return (
        <div className='CreateCar'>
            <center><h2>Add a Car</h2></center>
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

                <label>Exterior</label><br />
                <input type='text' id='exterior' name='exterior' value={car.exterior} onChange={handleChange} /><br />
                <br/>

                <label>Roof</label><br />
                <input type='text' id='roof' name='roof' value={car.roof} onChange={handleChange} /><br />
                <br/>

                <label>Wheels</label><br />
                <input type='text' id='wheels' name='wheels' value={car.wheels} onChange={handleChange} /><br />
                <br/>

                <label>Interior</label><br />
                <input type='text' id='interior' name='interior' value={car.interior} onChange={handleChange} /><br />
                <br/>

                <input type='submit' value='Submit' onClick={createGift} />
            </form>
        </div>
    )
}

export default CreateCar
