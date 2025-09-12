import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { main } from "./api/gemini.js";
import flash from "connect-flash"
import session from "express-session";
import cors from "cors"

const app = express()
dotenv.config()

const port = process.env.PORT || 3000


app.use(cors({ origin: "*" }));

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({secret:process.env.EXPRESS_SESSION_SECRET,saveUninitialized:false,resave:false}))
app.use(flash())
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });


// app.get('/', (req, res) => {
//     res.render("index")
// })
// app.get('/preview', (req, res) => {
//   const markdown = req.flash("markdown")  
//   res.json(markdown[0])
// })
app.post("/getdata", async (req, res) => {
  try {
    const { repoLink } = req.body;
    if (!repoLink) {
      return res.status(400).json({ message: "Repo link is missing" });
    }

    const splittedLink = repoLink.split("/");
    const owner = splittedLink[3];
    const repoName = splittedLink[4];

    const repo = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`);
    const repoContent = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/contents`);

    const markdown = await main(repo.data, repoContent.data);
    res.json({ markdown });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

