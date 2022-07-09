const { Product } = require("../../models");

const listProductsByQuery = async (req, res) => {
  const queryParameter = req.query.title;
  console.log(queryParameter);
  const result = await Product.find(
    {
      "title.ua": {
        $regex: queryParameter,
        $options: "i",
      },
    },
    "_id title.ua calories"
  ).exec();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listProductsByQuery;

/* const listProductsByQuery = async (req, res) => {
  const queryParameter = req.query.title;
  console.log(queryParameter);
  const result = await Product.find({ queryParameter });
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listProductsByQuery;
 */

/*
GET api/query/?name=phone
app.get('/api/query', (req, res) => {
    const name = req.query.name.toLowerCase()
    const products_result = products.filter(product => product.name.toLowerCase().includes(name))

    if (products_result.length < 1) {
        return res.status(200).send('No products matched your search')
    }
    res.json(products_result)
}) 

const [firstFileName] = Object.keys(files);

    res.json({ filename: firstFileName });
const { Product } = require("../../models");

const listProductsByQuery = async (req, res) => {
  const queryParameter = req.query.title;
  console.log(queryParameter);
  const result = await Product.find({ queryParameter });
  res.send({
    queryParameter: result,
  });
   res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  }); 
};

module.exports = listProductsByQuery; */

/* res.send({
  user_id: user_id,
  token: token,
  geo: geo,
}); */
