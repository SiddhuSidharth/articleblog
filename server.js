const express = require('express')
const mongoose=require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()
mongoose.connect('mongodb://localhost/blog',{
      useNewUrlParser: true,useUnifiedTopology: true})

app.set('view engine','ejs')
//to need to access all our parameters which was entered (title,decription,markdown) in the article route 
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',async(req,res) =>{
      const articles = await Article.find().sort({createdAt : 'desc'})
      res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)
app.listen(3500)
