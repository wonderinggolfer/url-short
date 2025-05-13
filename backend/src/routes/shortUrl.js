import express from 'express';
import { ShortUrlModel } from '../models/model.js';
import { nanoid } from 'nanoid'

const router = express.Router();


// Post - shorten URL - listens to post request to invoke /shortUrl

router.post('/shortUrl', async(req, res) => {
    const full = req.body.full;

    //check if its in the database
    try {
        const storedURL = await ShortUrlModel.findOne({full: full});

        if(storedURL) {
            return res.json(storedURL)
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error. Please try again later.'
        })
    }
    
    try {
        const shortUrlUpdate = await ShortUrlModel.create({
            full: full,
        })
        
        return res.status(201).json(shortUrlUpdate)  
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error. Could not save new URL'
        }) 
    }
})



// get all urls decesended order
router.get('/shortUrl', async(req, res) => {
    try {
        const allURLS = await ShortUrlModel.find().sort({createdAt: -1});
        return res.json(allURLS)
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error. Unable to retrieve all URLS'
        })
    }
})


// Redirect user -
router.get('/:shortUrl', async(req, res) => {
    try {
        const shortUrl= req.params.shortUrl;
        let storedShortUrl = await ShortUrlModel.findOne({shortUrl})
        
        if(!storedShortUrl) {
            return res.status(404).json({
                message: 'URL has not been found'
            })
        }

        storedShortUrl.clicks += 1;
        await storedShortUrl.save();

        return res.redirect(storedShortUrl.full)
    } catch(err) {
        console.error(err);
         return res.status(500).json({
            message: 'Internal server error. Unable to redirect'
        })
    }
})

// edit long url in a form thats submitted
router.patch('/shortUrl/:id', async(req, res) => {

    try {
        const id = req.params.id;
        const full = req.body.full;

        const updatedUrl = await ShortUrlModel.findByIdAndUpdate(id, {full: full}, {new: true});
    
        if(!updatedUrl) {
            return res.status(404).json({
                message: 'URL has not been found'
            })
        }

        return res.json(updatedUrl)

    } catch(err) {
        console.error(err);
         return res.status(500).json({
            message: 'Internal server error. Unable to continue request'
        })
    }
})


// delete data

router.delete('/shortUrl/:id', async (req, res) => {
    
    try {
        const id = req.params.id;

        const deletedUrl = await ShortUrlModel.findByIdAndDelete(id);

        if(!deletedUrl) {
            return res.status(404).json({
                message: 'URL has not been found'
            })
        }

        return res.status(200).json({
            message: 'URL deleted'
        })

    } catch(err) {
        console.error(err);
        return res.status(500).json({
             message: 'Internal server error'
        })
    }
})







export default router;