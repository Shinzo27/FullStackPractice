import dotenv from 'dotenv';

dotenv.config();

import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4-1106-preview",
});

console.log("Response : ", response);
const response = await model.stream(new HumanMessage("Hello world!"));