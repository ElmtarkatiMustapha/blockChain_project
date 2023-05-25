const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "assets")));

const homeRouter = require("./routes/home.router");
const authRouter = require("./routes/auth.router");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", homeRouter);
app.use("/login", authRouter);

//test add to the blockChain
const blockChain = require("./models/blockChain.model");
app.get("/add", (req, res, next) => {
  res.render("pages/addDiplome");
});
app.post("/add", (req, res, next) => {
  let data = req.body;
  blockChain
    .addDiplome(
      data.account,
      data.name,
      data.cin,
      data.cne,
      data.naiss,
      data.sector,
      data.diplomeType,
      data.session,
      data.insti
    )
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.send.redirect("/add");
    });
});
//end test

app.listen(3000, (error) => {
  console.log("server listening to the port 3000");
});
