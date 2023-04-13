import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";

import userRoutes from './routes/users.js'
import questionsRoutes from './routes/Quesrions.js'
import answerRoutes from './routes/Answers.js'
import postsRoutes from './routes/Posts.js'
import paymentRoutes from "./routes/payment.js"


const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {                              
  res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)    
app.use('/questions', questionsRoutes)    
app.use('/answer', answerRoutes)    
app.use('/posts', postsRoutes)    
app.use("/api/payment/", paymentRoutes)

const configuration = new Configuration({
  organization: "org-Fn2p2vM9YO7YTLjAHb9ZNvQ9",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => { const { message } = req.body;
  
try {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
    res.json({ message: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.send(error).status(400);
  }
});

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.set("strictQuery", true);
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`); }) ).catch((err) => console.log(err.message));
