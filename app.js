const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

mongoose.connect("mongodb://admin:eYMb;!4)DSsYxi@indyanin.myqnapcloud.com:37011/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

////Requests Targetting All Articles

app.route('/articles')
.get((req,res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
    res.send(foundArticles);
  } else {
    res.send(err);
  }
  });
})
.post((req, res) => {
    const newArticle = new Article ({
      title: req.body.title,
    content: req.body.content
  });
  newArticle.save(err => {
    if (!err) {
      res.send('Successfuly added a new article')
    } else {
      res.send(err)
    }
  });
})
.delete((req,res) => {
  Article.deleteMany(err => {
    if (!err) {
      res.send('Successfuly deleted all articles')
    } else {
      res.send(err)
    }
  })
});


////Requests Targetting A Specific Articles

app.route('/articles/:articleTitle')
.get((req,res) => {

  Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
    if (foundArticle) {
    res.send(foundArticle);
  } else {
    res.send('No articles matching that title was found');
  }
  });
})

.put((req,res) => {
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overrite: true},
    (err) => {
      if (!err) {
        res.send('Successfuly updated the content')
      }
    }
  )
})

.patch((req,res) => {
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    (err) => {
      if (!err) {
        res.send('Successfuly updated article');
      } else {
        res.send(err);
      }
    }
  )
})

.delete((req,res) => {
  Article.deleteOne(
    {title: req.params.articleTitle},
    (err) => {
      if (!err) {
        res.send('Successfuly deleted article');
      } else {
        res.send(err);
      }
    }
  );
});
// .post((req, res) => {
//     const newArticle = new Article ({
//       title: req.body.title,
//     content: req.body.content
//   });
//   newArticle.save(err => {
//     if (!err) {
//       res.send('Successfuly added a new article')
//     } else {
//       res.send(err)
//     }
//   });
// })
// .delete((req,res) => {
//   Article.deleteMany(err => {
//     if (!err) {
//       res.send('Successfuly deleted all articles')
//     } else {
//       res.send(err)
//     }
//   })
// });
