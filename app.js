const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const rootDir = require("./utils/path.js");
const { engine } = require("express-handlebars");
const app = express();

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: null,
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(3000, () => {
  console.log("server running on 3000");
});
