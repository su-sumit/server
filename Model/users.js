const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    accounts: {
        github:{
            id: String
        },
        google:{
            id: String
        }
    },
    credits: {
      type: Number,
      default: 0
    }
});

mongoose.model('users', userSchema);
