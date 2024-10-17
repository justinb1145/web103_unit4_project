import pool from "./database.js";
import "./dotenv.js";
import carData from "../data/cars.js";
import customData from "../data/customizable.js";
const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL,
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log("🎉 cars table created successfully");
    } catch (err) {
        console.error("⚠️ error creating cars table", err);
    }
    
}


const seedCarsTable = async () => {
  await createCarsTable();

  carData.forEach((custom) => {
    const insertQuery = {
      text: "INSERT INTO custom (name, pricePoint, exterior, wheels, roof, interior) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      custom.name,
      custom.pricePoint,
      custom.exterior,
      custom.wheels,
      custom.roof,
      custom.interior
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting custom", err);
        return;
      }

      console.log(`✅ ${custom.name} added successfully`);
    });
  });
};

seedCarsTable()



/*const createCustomsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS custom;

        CREATE TABLE IF NOT EXISTS customs (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL,
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log("🎉 customs table created successfully");
    } catch (err) {
        console.error("⚠️ error creating customs table", err);
    }
    
}


const seedCustomsTable = async () => {
  await createCustomsTable();

  customData.forEach((custom) => {
    const insertQuery = {
      text: "INSERT INTO customs (name, pricePoint, exterior, wheels, roof, interior) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      custom.name,
      custom.pricePoint,
      custom.exterior,
      custom.wheels,
      custom.roof,
      custom.interior
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting custom", err);
        return;
      }

      console.log(`✅ ${custom.name} added successfully`);
    });
  });
};

seedCustomsTable()*/