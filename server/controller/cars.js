import  pool from "../config/database.js";

const getCars = async (req, res) => {
    const selectCarsQuery = `
        SELECT * FROM cars;
    `;

    try {
        const results = await pool.query(selectCarsQuery);
        res.status(200).json(results.rows);
        console.log("🎉 items retrieved");
    } catch (err) {
        res.status(409).json({error: err.message})
        console.error("⚠️ error retreiving cars items", err);
    }
}

const getCarById = async (req, res) => {

    const selectQuery = `
        SELECT name,
            pricePoint,
            exterior,
            wheels,
            roof,
            interior,
        FROM cars
        WHERE id=$1

    `    
    const carId = req.params.carId
    try {
        const results = await pool.query(selectQuery, [carId])
        const item = results.rows[0]
        res.status(200).json(item)
        console.log(`🎉 retrieved ${item}`);
    } catch (error) {
       res.status(409).json( { error: error.message} ) 
    }
}


const createCar = async (req, res) => {
   try {
    const { name, pricepoint, exterior, wheels, roof, interior } = req.body
    const results = await pool.query(
      ` INSERT INTO cars (name, pricepoint, exterior, wheels, roof, interior)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [name, pricepoint, audience, image, description, submittedby, submittedon]
    );
    res.status(201).json(results.rows[0])
   } catch (err) {
    res.status(409).json( { error: err.message } )
   } 
}

const updateCar = async (req, res) => {

    try {
        const id = parseInt(req.params.id)
        const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body

        const results = await pool.query(`
            UPDATE cars SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon= $7 WHERE id = $8`,
            [name, pricepoint, audience, image, description, submittedby, submittedon, id]
        )

        res.status(200).json(results.rows[0])

    } catch (err) {
        res.status(409).json( { error: err.message } ) 
    }
} 

const deleteCar = async (req, res) => {

    try {
       const id = parseInt(req.params.id) 
       const results = await pool.query('DELETE FROM cars WHERE id = $1', [id])
       res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
  
} 

export default {
    getCars, 
    getCarById, 
    createCar,
    updateCar,
    deleteCar
}