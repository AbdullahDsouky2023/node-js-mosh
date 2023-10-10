const mongoose = require('mongoose')



// Define a schema for rentals
const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movies',
    required: true,
  },
  rentalDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
});

// Create a model for rentals
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
