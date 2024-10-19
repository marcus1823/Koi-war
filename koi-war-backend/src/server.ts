import swaggerDoc from "./config/swagger";
import cors from "cors";


const app = require("./app");


const PORT = Number(process.env.PORT) || 5000;
console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Swagger Docs
  swaggerDoc(app, PORT);
});
