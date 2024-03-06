const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override"); // put requesti post gibi simule etme . put'u tarayıcı desteklesin diye - güncelleme işlemeleri. delete'de de kullanılır
const ejs = require("ejs");
const path = require("path");
const fs = require("fs"); // çekirdek core modülü
const Photo = require("./models/Photo");

const app = express();

// connect database
mongoose.connect("mongodb://localhost/pcat-test-db");

// template engine - ejs
app.set("view engine", "ejs");

// Bir web uygulaması oluştururken, bu uygulamanın iskeleti statik dosyalardır. Biz oluşturmak istediğimiz uygulamanın iskelet yapısı ile ilgili css, html, js dosyalarını ve görsellerini öncelikle göndermek isteriz.
// express.static gömülü middleware fonksiyonu kullanılır
// MIDDLEWARES - ALDIGIIZ REQUESTLERİ SONLANDIRMAMIZA YARDIMCI OLDU
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES
// get requesti'de bir middleware'dir.
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated"); // veritabanındaki photoları aldık
  res.render("index", { photos });
});

app.get("/photos/:id", async (req, res) => {
  // console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  // console.log(req.files.image);
  // await Photo.create(req.body);
  //body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  // res.redirect("/");

  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    // sync kullanmamızın sebebi asenkron işlemderden önce yapsın bu file oluşturmayı
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadedImage.name; // public'e yeni klasör oluşturma, görselin gideceği yol,path

  uploadedImage.mv(uploadPath, async () => {
    // mv ile o klasöre eklemesini söyledik, ikinci parametre ise görseli veritabanına kaydet
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
});

app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit", {
    photo,
  });
});

app.put("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`); // değişmiş bilgilerle o photo sayfasına yönlensin
});

app.delete("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/public" + photo.image;     // public/uploads klasöründen de silmiş olduk
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
  
});

const port = 3000;
app.listen(port, () => {
  console.log(`working on port ${port}`);
});
