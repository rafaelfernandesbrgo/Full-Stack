const mongoose  = require('mongoose');

const BookingShema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    spot:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Spot'  
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Booking', BookingShema);