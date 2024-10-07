const app = require("./app");

const PORT = process.env.PORT || 5000;
console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
