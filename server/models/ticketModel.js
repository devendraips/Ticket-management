const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  Type: {
    type: String,
    required: [true, 'Please select a Type'],
    enum: ['Hardware', 'Software' ]
  },
  description: {
    type: String,
    required: [true, 'Please enter a description of the issue']
  },
  status: {
    type: String,
    required:true,
    enume:['new', 'open', 'closed'],
    default: 'new'
  }
}, {
  timestamps : true
})

module.exports = mongoose.model('Tickets', ticketSchema)