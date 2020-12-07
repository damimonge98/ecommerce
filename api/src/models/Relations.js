import db from '../db'
import Product from './Product'
import Categories from './Categories'

Product.belongsToMany(Categories);
Categories.belongsToMany(Product); //puede ser hasMany, revisar luego

export default db;
