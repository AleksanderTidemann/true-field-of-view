if (process.env.NODE_ENV === "production") {
  require("./dist");
} else {
  require("dotenv").config(); // load the custom environment variables
  require("nodemon")({ script: "dev.js" });
}
