const express = require("express");
const path = require('path')
const app = express();

// Bir web uygulaması oluştururken, bu uygulamanın iskeleti statik dosyalardır. Biz oluşturmak istediğimiz uygulamanın iskelet yapısı ile ilgili css, html, js dosyalarını ve görsellerini öncelikle göndermek isteriz.
// express.static gömülü middleware fonksiyonu kullanılır
app.use(express.static("public"));


// get requesti'de bir middleware'dir.
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname,'temp/index.html'))
});

const port = 3000;
app.listen(port, () => {
  console.log(`working on port ${port}`);
});
