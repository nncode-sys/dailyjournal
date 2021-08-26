//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "The Maulana Azad National Institute of Technology (MANIT) was established in 1960 as a Government. S.V. Polytechnic with an intake of 120 students and seven faculty members. The institute got its name after the renowned academician and scholar Maulana Abul Kalam Azad who was also the former Union Education Minister of India. ";

const aboutContent = "MANIT Campus :The total area of campus is 650 acres and protected by boundary wall and ring road. The entire campus consists of administrative and academic building, workshop, Library and community center, Residential area accommodation for students and staff and other general amenities such as post office, Shopping complex, a School for children, dispensary, an auditorium with the capacity of 1000 persons and sports complex with vast expand of open area. The campus is divided into three sections and facilities are given below:-.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));






var posts=[];

app.get("/",function(req,res) {
  res.render("home",{homeContent:homeStartingContent,
                     posts : posts
  });

});
app.get("/about",function(req,res) {
  res.render("about",{abtContent:aboutContent});
});
app.get("/contact",function(req,res) {
  res.render("contact",{contact_Content:contactContent});
});
app.get("/compose",function(req,res) {
  res.render("compose",{contact_Content:contactContent});
});
app.post("/compose",function(req,res){

  const post={
    title: req.body.postTitle,
    content : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle=_.lowerCase(req.params.postName);
  posts.forEach(function(post){
    var storedTitle=_.lowerCase(post.title);
    if(storedTitle===requestedTitle)
    {
    res.render("post",{title:post.title,
                       content:post.content
                            });
  }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
