import express, { urlencoded } from "express"
import mongoose from "mongoose"
import {v4} from "uuid"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017")

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:false
        
    },
    redirectUrl:{
        type:String,
        required:true,
        unique:false
        
    }
});

const Url = mongoose.model("Url",urlSchema);


const generateId = () => {
    const shortId = v4();
    return shortId;
}


app.post("/", async (req, res) => {
    const { redirectUrl } = req.body;

    const existingEntry = await Url.findOne({ redirectUrl });

    if (existingEntry) {
        res.status(200).send(existingEntry); 
    } else {
        let shortId = generateId(); 
        shortId = shortId.slice(0,5)
        const newEntry = await Url.create({ shortId, redirectUrl });

        if (newEntry) {
            res.status(200).send(newEntry);
        } else {
            res.status(403).send("Error creating URL entry.");
        }
    }
});


app.get("/my/:shortId",async (req,res) => {
    const shortId = req.params.shortId;
    console.log(shortId)
    const entry = await Url.findOne({shortId});
    console.log(entry)
    if(entry) {
        res.redirect(entry.redirectUrl);
    } else {
        res.status(200).send("err");
    }
})










app.listen(8000,() => {
    console.log("server started");
})