import swaggerDoc from "./config/swagger";
import cors from "cors";
import {corsOptions} from "./config/cors.config";

const app = require("./app");

app.use(cors(corsOptions));

const PORT = Number(process.env.PORT) || 5000;
console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Swagger Docs
  swaggerDoc(app, PORT);
});
