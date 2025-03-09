import 'dotenv/config';
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

// initializing Express app
const app= express();
// using port from environment variables or default 5000
const PORT =process.env.PORT || 5000;

// allowing frontend access by CORS
app.use(cors());
// enbling JSON parsing
app.use(express.json());

const SPOONACULAR_API_KEY= process.env.SPOONACULAR_API_KEY; // getting API key

app.get("/api/recipes", async (req, res) => {
    try {
        const { ingredients, diet } =req.query;
        // at least one ingredient provided
        if (!ingredients) {
            return res.status(400).json({ error: "Please provide ingredients." });
        }

        // API request URL
        const apiUrl =`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&includeIngredients=${ingredients}&diet=${diet}&number=10`;
        console.log("Fetching from Spoonacular:", apiUrl);

        // fetching recipes
        const response =await fetch(apiUrl);
        const data = await response.json();
        console.log("API Response:",data);

        // checking for results
        if (!data.results|| data.results.length === 0) {
            return res.status(404).json({error: "No recipes found." });
        }

        // sending recipes
        res.json(data.results);
    } catch (error) {
        console.error("Error fetching recipes:",error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// starting the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});