require("./globals");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const SessionStorage = require("connect-mongodb-session")(session);

const app = express();

const store = new SessionStorage({
  uri: urlDb,
  collection: "sessions",
});
app.use(
  session({
    secret: "BlockChainTechnologieProject",
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 100,
    },
    store: store,
  })
);
app.use(express.static(path.join(__dirname, "assets")));

const homeRouter = require("./routes/home.router");
const authRouter = require("./routes/auth.router");
const dashbordRouter = require("./routes/dashbord.router");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/", dashbordRouter);

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
