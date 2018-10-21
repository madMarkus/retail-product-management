export default class Product {
  constructor(id, options) {
    this.id = id;
    Object.assign(this, options);
  }
}