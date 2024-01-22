const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//get routes
app.get("/routes", async (req, res) => {
    try {
        const allRoutes = await pool.query(`
        SELECT
        route_id,
        route_name,
		distance,
		difficulty,
        duration,
        elevation,
		description,
		place_id,
		place_name,
		city,
		province,
        json_agg(json_build_object('lat',ST_X(coordinate) , 'lng', ST_Y(coordinate))) AS route_geometry
        FROM
        (
            SELECT r.id AS route_id, 
            p.id AS place_id, 
            r.name AS route_name, 
            r.distance AS distance, 
            r.difficulty AS difficulty, 
            r.description AS description, 
            r.duration AS duration,
            r.elevation AS elevation,
            (ST_DumpPoints(r.route_geom)).geom AS coordinate,
            p.name AS place_name, 
            p.province AS province, 
            p.city AS city, 
            (ST_DumpPoints(p.location)).geom AS location_coor
            FROM routes r
            JOIN place p ON r.place_id = p.id
        ) AS subquery
        GROUP BY
        route_id,
        route_name,
		distance,
		difficulty,
        duration,
        elevation,
		description,
		place_id,
		place_name,
		city,
		province;
        `);
        res.json(allRoutes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a route
app.get("/routes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const route = await pool.query(`
        SELECT
        route_id,
        route_name,
		distance,
		difficulty,
        duration,
        elevation,
		description,
		place_id,
		place_name,
		city,
		province,
        json_agg(json_build_object('lat',ST_X(coordinate) , 'lng', ST_Y(coordinate))) AS route_geometry
        FROM
        (
            SELECT r.id AS route_id, 
            p.id AS place_id, 
            r.name AS route_name, 
            r.distance AS distance, 
            r.difficulty AS difficulty, 
            r.duration AS duration,
            r.elevation AS elevation,
            r.description AS description, 
            (ST_DumpPoints(r.route_geom)).geom AS coordinate,
            p.name AS place_name, 
            p.province AS province, 
            p.city AS city, 
            (ST_DumpPoints(p.location)).geom AS location_coor
            FROM routes r
            JOIN place p ON r.place_id = p.id
            WHERE r.id = $1
        ) AS subquery
        GROUP BY
        route_id,
        route_name,
		distance,
		difficulty,
        duration,
        elevation,
		description,
		place_id,
		place_name,
		city,
		province;
        `, [id]);
        res.json(route.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/place", async (req, res) => {
    try {
        const place = await pool.query(`
        SELECT
        id,
        name,
        province,
        city,
        json_agg(json_build_object('lat',ST_Y(coordinate) , 'lng', ST_X(coordinate))) AS location_coor
        FROM
        (
            SELECT
            id,
            name,
			province,
            city,
            (ST_DumpPoints(location)).geom AS coordinate
            FROM
            place
        ) AS subquery
        GROUP BY
        id,
        name,   
        province,
        city;
        `);
        res.json(place.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
});