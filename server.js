// server.js
import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/generate', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = "AIzaSyDzRU9YF7TbRycmBgsUQh2yg8cf33vU5kM";

    if (!apiKey) {
        return res.status(500).json({ error: "API key is not set in environment variables" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(userMessage);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Error generating content" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});