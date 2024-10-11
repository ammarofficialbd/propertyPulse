import {Schema, model, models} from 'mongoose'

const UserShcema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already Exist"],
        required: [true, "Email is Required"]
    },
    username:{
        type: String,
        required: [true, "Email is Required"]
    },
    image:{
        type: String
    },
    bookmarks: [
    {   type: Schema.Types.ObjectId,
        ref: 'Property'
    }
    ]
},
{timestamps: true});

const User = models.User || model('User', UserShcema)

export default User