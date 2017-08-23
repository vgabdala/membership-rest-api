import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('Member', new Schema({ 
  firstName: {
    type: String,
    default: '',
    required: 'Please fill Member first name'
  },
  lastName: {
    type: String,
    default: '',
    required: 'Please fill Member first last name'
  },
  dob: {
    type: Date, 
    required: 'Please fill Member DOB'
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill Member email',
    unique: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  createdByUserId: {
    type: String,
    required: 'Please fill the id of the user who is creating this member'
  }
}))