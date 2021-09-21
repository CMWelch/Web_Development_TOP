import express from "express";
import dotenv from "dotenv";

if(process.env.NODE_ENV !== 'poduction')
{
    dotenv.config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
console.log(stripeSecretKey);

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000);