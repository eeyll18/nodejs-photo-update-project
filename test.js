// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// connect database
// mongoose.connect("mongodb://localhost/pcat-test-db");

// create Schema
// const PhotoSchema = new Schema({
//   title: String,
//   description: String,
// });

// const Photo = mongoose.model("Photo", PhotoSchema);

// create a photo
// Photo.create({
//   title: "Photo Title 1",
//   description: "description 1",
// });



// read photo
// Photo.find().then((data) => {
//   console.log(data);
// });

// update photo
// const id = "6079f04e5916c524d4bdcb74";
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: "Photo Title 111 updated",
//     description: "Photo description 111 updated",
//   },
//   {
//     new: true,
//   }
// ).then((data) => {
//   console.log(data);
// });

// delete photo
// const id = '65dcc2dfc02d18709890c424'
// Photo.findByIdAndDelete(id).then(data=>{
//     console.log('delete');
// })
