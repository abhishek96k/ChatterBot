const express = require("express");
const cors = require("cors");
// OpenAI API
const OPENAI_API_KEY = "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";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({
        message: "pong",
    });
});

// User send Query
app.post("/chat", (req, res) => {
    const question = req.body.question;

    openai.
    createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
      })
      .then((response) => {
        console.log({ response });
        return response?.data?.choices?.[0]?.text;
      })
      .then((answer) => {
        console.log({ answer });
        const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());

        return array;
      })
      .then(answer => {
        res.json({
            answer: answer,
            propt: question,
        });
      });

    console.log({ question });
});

app.listen(3333, () => {
    console.log("Server is listening on port 3333");
});