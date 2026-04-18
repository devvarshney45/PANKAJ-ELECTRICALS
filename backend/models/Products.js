import mongoose  from "mongoose";
const productSchema=new mongoose.Schema({
    name : String,
    brand: { type: String, index: true },
    price : Number,
    image: String
});
const Product=mongoose.model("Product",productSchema);
export default Product;