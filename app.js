import express from "express";
import agentsRoutes from "./routes/agentsR.js"
import reportsRoutes from "./routes/reportsR.js";

const app = express();
const port = 3003;

app.use(express.json());
app.use("/health",(req, res) => {
    try {
        res.send({ok: true })
    } catch (error) {
        res.send({error: false })
    }
    })
app.use("/agents", agentsRoutes);
// app.use("/users")
app.use("/reports",reportsRoutes)

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})