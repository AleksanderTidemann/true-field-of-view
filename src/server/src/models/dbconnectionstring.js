import config from "config";

const dbconnectionstring = `mongodb+srv://${config.get(
  "db.username"
)}:${config.get(
  "db.password"
)}@tfov.5xn0i.mongodb.net/crowdData?retryWrites=true&w=majority`;
export default dbconnectionstring;
