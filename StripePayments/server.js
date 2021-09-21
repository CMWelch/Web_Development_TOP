import express from "express";
import dotenv from "dotenv";
import { dirname } from 'path';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV !== 'poduction')
{
    dotenv.config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
console.log(stripeSecretKey);

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/band-page'));

app.listen(3000);