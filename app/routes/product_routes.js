const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  // CREATE ROUTE
  app.post('/products', (request, response) => {
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
  });

  // READ ALL ROUTE
  app.get('/products/', (request, response) => {
    // Requesting documents
    db.collection('products').find().toArray((error, results) => {
      if (error) {
        console.log('ERROR! AT READ ALL PRODUCTs ' + error)
        response.send({'error': 'An error has occured!'});
      } else {
        response.send(results);
      }
    })
  });

  // READ ROUTE
  app.get('/products/:id', (request, response) => {
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
  });

  // DELETE ROUTE
  app.delete('/products/:id', (request, response) => {
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
  });

  // UPDATE ROUTE
  app.put('/products/:id', (request, response) => {
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
  });
};