import express from "express";
import { readdir } from "node:fs/promises"; // For reading files async
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.model.js";
import multer from "multer";
import session from "./config/session.js";
import bodyParser from "body-parser";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicFolder = path.join(root, "public");
const privateFolder = path.join(root, "private");
const pagesFolder = path.join(publicFolder, "pages");
const publicUploads = path.join(publicFolder, "uploads");
const privateUploads = path.join(privateFolder, "uploads");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);

await User.sync({ alert: true });

// Upload logic
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isPrivate = req.body.private === "on";
    cb(null, isPrivate ? privateUploads : publicUploads);
  },
  filename: function (req, file, cb) {
    let shortDate = Date.now() % 10000;
    const isPrivate = req.body.private === "on";
    const status = isPrivate ? "Private" : "Public";
    cb(null, `${status}-${shortDate}-` + file.originalname);
  },
});
const uploadMw = multer({ storage });

// User upload
app.post("/", uploadMw.single("upload"), (req, res) => {
  res.redirect("/");
});

// Main page (add-file.html)
app.get("/", (req, res) => {
  if (req.session.user) {
    console.log(`Welcome ${req.session.user.username}`);
    res.sendFile(path.join(pagesFolder, "add-file.html"));
  } else {
    res.redirect("/login");
  }
});

// Protected page
app.get("/protected", (req, res) => {
  if (req.session.user) {
    console.log(`Welcome ${req.session.user.username}`);
    res.sendFile(path.join(pagesFolder, "protected.html"));
  } else {
    res.redirect("/login");
  }
});

// Private single file access
app.get("/private/:file", (req, res) => {
  if (req.session.user) {
    const fileName = req.params.file;
    res.sendFile(path.join(privateUploads, fileName));
  } else {
    res.redirect("/login");
  }
});

// Private all files access
app.get("/all-private-files", async (req, res) => {
  if (req.session.user) {
    const allFiles = await readdir(privateUploads);
    res.status(200).json(allFiles);
  } else {
    res.redirect("/login");
  }
});

// All files access (Private & Public)
app.get("/all-files", async (req, res) => {
  if (req.session.user) {
    const privateFiles = await readdir(privateUploads);
    const publicFiles = await readdir(publicUploads);
    const allFiles = [...privateFiles, ...publicFiles];
    res.status(200).json(allFiles);
  } else {
    res.redirect("/login");
  }
});

// Public page
app.get("/public", (req, res) => {
  if (req.session.user) {
    console.log(`Welcome ${req.session.user.username}`);
    res.sendFile(path.join(pagesFolder, "public.html"));
  } else {
    res.redirect("/login");
  }
});

// Public single file access
app.get("/public/:file", (req, res) => {
  if (req.session.user) {
    const fileName = req.params.file;
    res.sendFile(path.join(publicUploads, fileName));
  } else {
    res.redirect("/login");
  }
});

// Public all files access
app.get("/all-public-files", async (req, res) => {
  if (req.session.user) {
    const allFiles = await readdir(publicUploads);
    res.status(200).json(allFiles);
  } else {
    res.redirect("/login");
  }
});

// Login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(pagesFolder, "login.html"));
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({
      where: { username },
    });

    if (userExist && userExist.password === password) {
      req.session.user = { id: userExist.id, username: userExist.username };
      return res.redirect("/");
    }
    res.redirect("/login");
  } catch (error) {
    res.status(400).send("Cant send user data to server");
  }
});

// Log-out
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

// Register page
app.get("/register", (req, res) => {
  res.sendFile(path.join(pagesFolder, "register.html"));
});

// Register User *
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({
      where: { username },
    });
    if (userExist) {
      return res.redirect("/register");
    }
    await User.create({
      username,
      password,
    });
    res.redirect("/login");
  } catch (error) {
    res.status(400).send("Cant send user data to server");
  }
});

// Tailwind
app.get("/output.css", (req, res) => {
  res.sendFile(path.join(pagesFolder, "output.css"));
});

app.listen(3000, () => {
  console.log("Serveris veikia. http://localhost:3000");
});
