const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // This will allow all origins
app.use(express.json()); // To parse JSON request bodies

const HF_API_TOKEN = "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";  // Replace with your Hugging Face API token
const MODEL_URL = "https://api-inference.huggingface.co/models/gpt2";

app.post("/analyze", async (req, res) => {
    const inputText = req.body.input;
    console.log(inputText);

    if (!inputText) {
        console.log("Input required");
        return res.status(400).send({ error: "Input text is required." });
    }

    try {
        const response = await axios.post(
            MODEL_URL,
            { inputs: inputText },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response.data);
        console.log(response.data[0].generated_text);
        res.status(200).send({ generated_text: response.data[0].generated_text });
    } catch (error) {
        console.error("Error fetching model response:", error.response ? error.response.data : error.message);
        res.status(500).send({ error: "Failed to generate response from the model." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
