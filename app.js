const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Article = require("./models/article");  // Renamed Blog to Article for a fresh touch

const app = express();

// Database connection
mongoose.connect("mongodb+srv://yashgupta:qlu3iEPJKzJXc5WL@cluster0.njnqlfc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Connected to MyPersonalBlogHub database'))
    .catch(err => console.error('Database connection error:', err.message));

// App setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));  // Changed from 'Public' to 'assets' for a fresh touch
app.use(express.urlencoded({ extended: true }));

const SERVER_PORT = 3000;

// Routes
app.get('/', (req, res) => {
    res.redirect('/compose');
});

app.get("/articles", async (req, res) => {
    const articles = await Article.find({});
    res.render('list_articles', { articles });  // Changed view name for a fresh touch
});

app.get('/compose', (req, res) => {
    res.render("create_article");  // Changed view name for a fresh touch
});

app.post('/compose', async (req, res) => {
    const { fname, lname, email, title, image1, image2, image3, image4, content } = req.body;
    const newArticle = await Article.create({ 
        name: `${fname} ${lname}`, 
        email, 
        photos: [image1, image2, image3, image4], 
        content, 
        title 
    });

    if (!newArticle) {
        console.log('Error creating article');
    } else {
        console.log('Article created successfully');
    }
    res.redirect("/articles");
});

app.get("/read/:articleId", async (req, res) => {
    const article = await Article.findById(req.params.articleId);
    res.render('read_article', { article });  // Changed view name for a fresh touch
});

app.post("/delete/:articleId", async (req, res) => {
    const deletedArticle = await Article.findByIdAndDelete(req.params.articleId);
    if (!deletedArticle) {
        console.log('Error deleting article');
    } else {
        console.log('Article deleted successfully');
    }
    res.redirect("/articles");
});

// Start server
app.listen(SERVER_PORT, () => { 
    console.log(`MyPersonalBlogHub server running on port ${SERVER_PORT}`); 
});
