import express from 'express';
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(4000, () => {console.log(`App is running on port 4000`)});