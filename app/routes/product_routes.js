const ObjectID = require('mongodb').ObjectID;

/**
 * This file contains all routes for products.
 */

module.exports = function(app, db) {
  app.post('/products', createProduct(app, db));
  app.get('/products/', getAllProducts(app, db));
  app.get('/products/:id', getProduct(app, db));
  app.put('/products/:id', updateProduct(app, db));
  app.delete('/products/:id', deleteProduct(app,db));
};

/**
 * Creates a new product, and sends new object in response.
 *
 * @param {*} app Server application object.
 * @param {*} db Database Object
 * @return {function(): void} Closure for creating a new product.
 */
const createProduct = (app, db) => (request, response) => {
  // FIXME: This kind of logic should be moved to the model
  const product = {
    name: request.body.name,
    company: request.body.company,
  };
  db.collection('products').insert(product, (error, result) => {
    if (error) {
      console.log('ERROR! AT CREATE PRODUCT ' + error)
      response.send({'error': 'An error has occured!'});
    } else {
      response.send(result.ops[0]);
    }
  });
};

/**
 * Reads a list of products, and sends it in response.
 *
 * @param {*} app Server application object.
 * @param {*} db Database Object
 * @return {function(): void} Closure for reading a list of products.
 */
const getAllProducts = (app, db) => (request, response) => {
  // Requesting documents
  db.collection('products').find().toArray((error, results) => {
    if (error) {
      console.log('ERROR! AT READ ALL PRODUCTs ' + error)
      response.send({'error': 'An error has occured!'});
    } else {
      response.send(results);
    }
  })
};

/**
 * Reads a single product, and sends it in response.
 *
 * @param {*} app Server application object.
 * @param {*} db Database Object
 * @return {function(): void} Closure for reading a single product.
 */
const getProduct = (app, db) => (request, response) => {
  // Extraxting id from query params
  const id = request.params.id;

  // Creating details for filtering documents
  const details = {'_id': new ObjectID(id)};

  // Requesting the document
  db.collection('products').findOne(details, (error, item) => {
    if (error) {
      console.log('ERROR! AT READ PRODUCT ' + error)
      response.send({'error': 'An error has occured!'});
    } else {
      response.send(item);
    }
  })
};

/**
 * Updates a single product, and sends it in response.
 *
 * @param {*} app Server application object.
 * @param {*} db Database Object
 * @return {function(): void} Closure for updating a single product.
 */
const updateProduct = (app, db) => (request, response) => {
  // Extraxting id from query params
  const id = request.params.id;

  // Creating details for updating documents
  const details = {'_id': new ObjectID(id)};

  // Requesting the document
  db.collection('products').findOneAndUpdate(
    details,
    {
      $set: {
        name: request.body.name || undefined,
        company: request.body.company || undefined,
      }
    },
    {
      returnOriginal: false,
    },
    (error, item) => {
    if (error) {
      console.log('ERROR! AT UPDATE PRODUCT ' + error)
      response.send({'error': 'An error has occured!'});
    } else {
      response.send(item.value);
    }
  })
};

/**
 * Delets a single product, and sends it in response.
 *
 * @param {*} app Server application object.
 * @param {*} db Database Object
 * @return {function(): void} Closure for deleting a single product.
 */
const deleteProduct = (app, db) => (request, response) => {
  // Extraxting id from query params
  const id = request.params.id;

  // Creating details for deleting documents
  const details = {'_id': new ObjectID(id)};

  // Requesting the document
  db.collection('products').remove(details, (error, item) => {
    if (error) {
      console.log('ERROR! AT DELETE PRODUCT ' + error)
      response.send({'error': 'An error has occured!'});
    } else {
      response.send(
        'Product ' + id + ' was successfuly removed from database'
        );
    }
  })
};
