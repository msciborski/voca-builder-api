import "reflect-metadata";
import app from "./App";

const PORT = Number.parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log('Server start on ' + PORT);
});