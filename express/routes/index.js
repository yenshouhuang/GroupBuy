var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var mysql = require('mysql2');
// const { request } = require('express');

const conn = mysql.createConnection({
  host: '34.123.145.94',
  user: 'ken',
  password: '123',
  database: 'db1'
});

conn.connect();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3001, () => {
  console.log('Server started on port 3001...');
});

/* GET home page. */
app.get('/', (req, res) => {
  res.send("Demo Website for GroupBuy Application");
});

//GET Post Info
app.get('/post/:id', (req, res) => {
  const id = req.params.id
  // console.log(req)
  let sqlSearch = "SELECT * \
                   FROM Post LEFT JOIN Product USING (postId) LEFT JOIN User USING(userId)\
                   WHERE postId="+ id + ";";

  conn.query(sqlSearch, (err, result) => {
    console.log('result:', result, err, id)
    res.send(result);
  })
});

// GET Post's Group Info
app.get('/post/group/:id', (req, res) => {
  const id = req.params.id
  console.log('PostInfo')
  let sql = "SELECT userName\
            FROM UserPost up LEFT JOIN User USING (userId)\
            WHERE up.postId=" + id + ";";
  conn.query(sql, (err, result) => {
    console.log('result:', result, err, id)
    res.send(result);
  })
});

app.post('/post/insert', (req, res) => {

  const userId = req.body.userId
  const expirationDate = req.body.expirationDate
  const groupLimit = req.body.groupLimit
  const paymentMethod = req.body.paymentMethod
  const categoryId = req.body.categoryId
  const productName = req.body.productName
  const storeName = req.body.storeName
  const price = req.body.price
  const link = req.body.link

  let sqlInsert = 'INSERT INTO Post (userId, expirationDate, groupLimit, paymentMethod, categoryId) VALUE(?,?,?,?,?);';
  conn.query(sqlInsert, [userId, expirationDate, groupLimit, paymentMethod, categoryId], (err, result) => {
    console.log(err);
  })

  let sqlGetPostId = 'SELECT postId FROM Post WHERE userId = ' + userId + ' ORDER BY postId DESC LIMIT 1;';
  conn.query(sqlGetPostId, (err, result) => {
    let postIdRes = result;

    let sqlInertInitiator = "INSERT INTO UserPost (userId, postId) VALUE(?," + postIdRes[0].postId + ");";
    conn.query(sqlInertInitiator, [userId], (err, result) => {
      console.log(err);
    })

    let sqlInsertProduct = "INSERT INTO Product (productName, storeName, price, link, postId) VALUE(?,?,?,?," + postIdRes[0].postId + ");";
    conn.query(sqlInsertProduct, [productName, storeName, price, link], (err, result) => {
      console.log(err);
    })
  })
});

app.post('/post/update', (req, res) => {
  const postId = req.body.postId
  const expirationDate = req.body.expirationDate
  const groupLimit = req.body.groupLimit
  const paymentMethod = req.body.paymentMethod
  const userId = req.body.userId

  let sqlUpdatePost = 'UPDATE Post SET expirationDate = ?, groupLimit = ?, paymentMethod = ? WHERE postId = ? AND userId = ?';
  conn.query(sqlUpdatePost, [expirationDate, groupLimit, paymentMethod, postId, userId], (err, result) => {
    console.log(err);
  })
});


app.get('/post/read', (req, res) => {
  let sqlquery = 'SELECT * FROM Post NATURAL JOIN Product LIMIT 10';
  conn.query(sqlquery, (err, result) => {
    res.send(result);
  })
});

app.post('/post/search', (req, res) => {
  const productName = req.body.productName
  let pn = '%' + productName + '%'
  let sqlSearch = "SELECT * FROM Post NATURAL JOIN Product WHERE productName LIKE '" + pn + "' order by productName LIMIT 10";
  conn.query(sqlSearch, (err, result) => {
    console.log('result:', result)
    res.send(result);
  })
});

app.post('/post/search-user', (req, res) => {
  const userName = req.body.userName
  let pn = '%' + userName + '%'
  let sqlSearch = "SELECT * FROM User JOIN Post USING (userId) JOIN Product USING (postId) WHERE userName LIKE '" + pn + "' ORDER BY postId";
  conn.query(sqlSearch, (err, result) => {
    console.log('result:', result)
    res.send(result);
  })
});

// login function
app.use('/login', (req, res) => {
  const authUser = req.body.username
  const authpw = req.body.password
  let sqlSearch = "SELECT userId, password FROM User WHERE userName = '" + authUser + "'";
  conn.query(sqlSearch, (err, result) => {
    console.log(result)
    if (result.length == 0) {
      res.send({ token: 'err' })
      console.log('Something wrong with login credentials')
    }
    else if (result[0].password === authpw) {
      res.send({
        // token: 'test123'
        token: `test123 ${result[0].userId}`
      });
    }
    else {
      res.send({ token: 'err' })
      console.log('Something wrong with login credentials')
    }
  })
});

//join post
app.post('/post/join', (req, res) => {
  const userId = req.body.userId
  const postId = req.body.postId

  let sqlJoinPost = 'INSERT INTO  UserPost (userId, postId) VALUE(?,?);';
  conn.query(sqlJoinPost, [userId, postId], (err, result) => {
    res.send(err ? err.message : "Success")
    console.log(err);
  })
});

//leave post
app.delete('/post/leave/:postId/:userId', (req, res) => {
  const postId = req.params.postId
  const userId = req.params.userId

  let sqlLeavePost = 'DELETE FROM UserPost WHERE userId = ? AND postId = ?;';
  conn.query(sqlLeavePost, [userId, postId], (err, result) => {
    res.send(err ? err.message : "Delete Successfully")
    console.log(err);
  })
});

// register function
app.post('/post/register', (req, res) => {
  console.log('this is register')
  const username = req.body.regusername
  const password = req.body.regpassword
  const email = req.body.email
  const phoneNumber = req.body.phoneNumber
  let sqlInsert = 'INSERT INTO User (username, password, email, phoneNumber) VALUE(?,?,?,?);';
  conn.query(sqlInsert, [username, password, email, phoneNumber], (err, result) => {
    if (err) {
      res.send(err.sqlState)
      console.log('error code:', err.sqlState)
      console.log(err.sqlMessage)
    }
    else {
      console.log(result)
      res.send(result)
    }

  })

});

// adv query
app.post('/post/advsearch1', (req, res) => {
  console.log('adv search')
  let sqlSearch = "SELECT userId, userName, COUNT(postId) as numOfPost\
                   FROM User JOIN Post USING (userId)\
                   WHERE expirationDate < ('2022-01-01') AND userName LIKE '%en%'\
                   GROUP BY userId order by numOfPost desc LIMIT 15;";
  conn.query(sqlSearch, (err, result) => {
    // console.log(result)
    res.send(result);
  })
});

app.post('/post/advsearch2', (req, res) => {
  console.log('adv search')
  let sqlSearch = "(SELECT c.categoryId, c.categoryName, COUNT(postId) as NumberOfPost\
                    FROM Post p NATURAL JOIN Category c\
                    WHERE p.userId > 800 and c.categoryName='Meat'\
                    GROUP BY c.categoryId)\
                    UNION\
                    (SELECT c.categoryId, c.categoryName, COUNT(postId) as NumberOfPost\
                    FROM Post p NATURAL JOIN Category c\
                    WHERE p.userId < 200 AND  c.categoryName='Bakery'\
                    GROUP BY c.categoryId );";
  conn.query(sqlSearch, (err, result) => {
    console.log(result)
    res.send(result);
  })

});

app.get('/get/advsearch3', (req, res) => {
  console.log('adv query store procedure')
  let sqlProcedure = 'CALL AnalyzeUser()';
  conn.query(sqlProcedure, (err, result) => {
    console.log(result[0][0])
    res.send(result);
  })

});

app.delete('/post/delete/:id', (req, res) => {
  const deleteId = req.params.id
  let sqlDeletePost = "DELETE FROM Post WHERE postId = ?";
  let sqlDeleteProduct = "DELETE FROM Product WHERE postId = ?";
  conn.query(sqlDeletePost, deleteId, (err, result) => {
    if (err) console.log(err)
  })
  conn.query(sqlDeleteProduct, deleteId, (err, result) => {
    if (err) console.log(err)
  })
});

module.exports = router;
