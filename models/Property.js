import {Schema, model, models} from 'mongoose'

const PropertyShcema = new Schema({
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required : true
    },
    description:{
        type: String,
    },
    location: {
        street : { type : String},
        city : {type  : String},
        state : {type  : String},
        zipcode : {type  : String}

    },
    beds: {
        type: String,
        required: true
    },
    baths: {
        type: String,
        required: true
    },
    square_feet: {
        type: Number,
        required: true
    },
    amenities: [
        {
            type: String
        }
    ],
    rates:{
        nightly : Number,
        weekly: Number,
        monthly: Number
    },
    seller_info:{
        name: String,
        email: String,
        phone: String
    },
    images : [
        {
            type: String
        }
    ],
    is_featured : {
        type: Boolean,
        default: false
    }
},
{timestamps: true});

const Property = models.Property || model('Property', PropertyShcema)

export default Property