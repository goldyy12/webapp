import app from "./src/app.js";

const PORT = Number(process.env.PORT) || 4000;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
