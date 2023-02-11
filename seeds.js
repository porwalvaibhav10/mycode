const mongoose = require('mongoose');
const Product = require('./models/product')
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log('CONNECTED TO MONGOOSE');

}).catch(err=>{
    console.log('ohhh no error');
    console.log(err);

})

// const p = new Product(
//     {name:'grapes',
//     price:10,
//     category:'fruit'}
// )
// p.save().then(p=>{
//     console.log(p)
// }).catch(err => {
//     console.log("Ooh no error");
//     console.log(err)
// })

const seedProducts = [
        {name:'orange',
        price:10,
        category:'fruit'},
        {name:'grapefruit',
        price:45,
        category:'fruit'},
        {name:'watermelon',
        price:18,
        category:'fruit'},
        {name:'papita',
        price:16,
        category:'fruit'},
        {name:'banana',
        price:17,
        category:'fruit'},
        {name:'raspberry',
        price:11,
        category:'fruit'},
        {name:'strawberry',
        price:19,
        category:'fruit'}
    
]


Product.insertMany(seedProducts).
then(frt =>{
    console.log(frt)
}).catch(e=>{
    console.log(e);
})