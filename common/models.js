module.exports = {
    user:{
        name: {type: String},
        password: {type: String}
    },
    commodity: {
        name: String,
        price: Number,
        imgSrc: String
    },
    cart: {
        uId: {type: String},
        cId: {type: String},
        cName: { type: String},
        cPrice: { type: String},
        cImaSrc: { type: String},
        cQuantity: { type: Number},
        cStatus: { type: Boolean,default: false} 
    }
}