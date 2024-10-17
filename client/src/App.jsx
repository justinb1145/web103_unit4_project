import React, {useState, useEffect} from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {

  const [gifts, setCars] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {

    const fetchCars = async() => {
        try {
          const response = await fetch("http://localhost:3001/cars");

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          
          setGifts(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        } 
    };
    
    fetchCars();
  }, []);

  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar title='BOLT BUCKET | Customize' />
    },
    {
      path:'/customcars',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ])

  return ( 

    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/lightning.png"/>
            <h1>Cars</h1>
          </div>
          <div className="header-right">
            <Link to='/new'><button className='addBtn'>+ Add Car</button></Link>
            <Link to="/"><button className="homeBtn">Home</button></Link>
          </div>
        </div>
      </header>

        {element}
        
    </div>
  )
}

export default App