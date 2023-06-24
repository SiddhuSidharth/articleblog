const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new',(req,res)=>{
      res.render('articles/new',{article :new Article()})
})
router.get('/:slug',async(req,res)=>{
      const article = await Article.findOne({slug:req.params.slug})
      if(article == null){
            res.redirect('/')
      }
      res.render('articles/show',{article:article})

})
router.post('/',async(req,res)=>{
      let article =new Article({
            title: req.body.title,
            description:req.body.description,
            markdown:req.body.markdown

      })
      try{
            //saving in the database
            //going to give an id for the article
      article=await article.save()
      res.redirect(`/articles/${article.slug}`)
      }
      //error such as not entered any value and we are remaining in the same page to enter 
      catch(e){
            console.log(e)
            res.render('articles/new',{article:article})
      }
})

//In order to use delete method we import a library
router.delete('/:id',async(req,res) =>{
      await Article.findByIdAndDelete(req.params.id)
      res.redirect('/')
})
module.exports=router
