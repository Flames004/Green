import "dotenv/config"
import express from 'express'
import connectDb from "./db/connectDb.js";
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import plantRoutes from "./routes/plant.routes.js"
import adminRoutes from "./routes/admin.routes.js"



const app = express();

const port = process.env.PORT || 5000;
connectDb();

app.use(express.json());
app.use(express.urlencoded({extendend: true}));
app.use(cookieParser());


// routes
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/plants', plantRoutes);
app.use('/api/v1/admin', adminRoutes);

app.listen(port, () =>{
    console.log(`server is listening on port: ${port}`);
});