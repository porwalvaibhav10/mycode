const express = require('express');
const app = express();
const path = require ('path');
const mongoose = require('mongoose');
const Product = require('./models/product')
const methodOverride = require('method-override');



mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log('CONNECTED TO MONGOOSE');

}).catch(err=>{
    console.log('ohhh no error');
    console.log(err);

})

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))//this we do for parsing the post for submit data witout it the data will be undefined
app.use(methodOverride('_method'))

app.get('/products', async (req,res)=>{
    const { category } = req.query;
    console.log(category)
    if (category){
        const products = await Product.find({category:category})
        res.render('products/index', {products, category})
    }else{
        const products = await Product.find({})
        // console.log(products);
        res.render('products/index', {products, category:'All'});

    }
})


const categories = ['fruit', 'vegetable', 'dairy']
app.get('/products/new', (req, res)=>{
    res.render('products/new', {categories});
})

app.post('/products', async (req,res) =>{
    console.log(req.body);
    const newproduct  = new Product(req.body);
    await newproduct.save();
    res.redirect(`/products/${newproduct._id}`);
})



app.get('/products/:id', async(req, res) => {
    const { id }= req.params;
    const spproduct = await Product.findById(id);
    res.render('products/details', {spproduct});
})

app.get('/products/:id/edit', async (req,res)=>{
    const { id }= req.params;
    const spproduct = await Product.findById(id);
    res.render('products/edit', {spproduct, categories})
    
})

app.listen(3000, ()=>{
    console.log("Connected to the port 3000")
})