import db from '../db'
import Product from './Product'
import Categories from './Categories'

Product.belongsToMany(Categories, { through: 'Product_Category'});
Categories.belongsToMany(Product, { through: 'Product_Category'}); 

export default db;
