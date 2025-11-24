import "dotenv/config"
import express from 'express'
import connectDb from "./db/connectDb.js";
import userRoutes from './routes/user.routes.js'
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes.js"

const app = express();

const port = process.env.PORT || 5000;
connectDb();

app.use(express.json());
app.use(express.urlencoded({extendend: true}));
app.use(cookieParser());


// routes
app.use('/api/v1/auth' , userRoutes);
app.use('/api/v1/auth/admin', adminRoutes);

app.listen(port, () =>{
    console.log(`server is listening on port: ${port}`);
});