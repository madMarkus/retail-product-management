const productRoutes = require('./product_routes');

module.exports = function(app, db) {
  productRoutes(app, db);
}