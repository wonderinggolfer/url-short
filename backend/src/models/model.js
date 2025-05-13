import mongoose from 'mongoose';
import {nanoid} from  'nanoid';

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String, 
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true, // prevets clashing
        default: () => nanoid(6)
    },
    clicks: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});


export const ShortUrlModel = mongoose.model('ShortUrl', shortUrlSchema)