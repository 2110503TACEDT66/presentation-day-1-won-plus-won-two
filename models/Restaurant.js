const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50,'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String,
        required: [true, 'Please add an telephone number']
    },
   openningtime:{                                           // Do we need a closing time?
        type: String,
        required: [true, 'Please add a opentime'] 
   },
   closingtime: { // Added closing time
    type: String,
    required: [true, 'Please add a closing time']
    }
   
},{
    toJSON:{virtuals:true},
    toObject: {virtuals:true}
});
RestaurantSchema.pre(`deleteOne`,{ document:true, query:false},async function(next){
    console.log(`Reservation being removed from restaurant ${this._id}`);
    await this.model(`Reservation`).deleteMany({restaurant: this._id});

    next();
});
RestaurantSchema.virtual('reservations',{
    ref:'Reservation',
    localField:'_id',
    foreignField : 'restaurant',
    justOne:false
});

RestaurantSchema.pre(`deleteOne`,{ document:true, query:false},async function(next){
    console.log(`Reviews being removed from restaurant ${this._id}`);
    await this.model(`Review`).deleteMany({restaurant: this._id});

    next();
});
RestaurantSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField : 'restaurant',
    justOne:false
});


module.exports = mongoose.model('Restaurant', RestaurantSchema);