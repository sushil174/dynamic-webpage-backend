const express = require('express')
const Page = require('../models/Page')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const pages = await Page.find();
        res.status(200).json(pages)
    } catch(error) {
        res.status(500).json({message: 'Failed to fetch pages', error})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const page = await Page.findById(req.params.id)
        if(!page) return res.status(404).json({message: 'Page not found'})
        res.status(200).json(page)
    }catch(error) {
        res.status(500).json({message: 'Failed to fetch page', error})
    }
})

router.post('/', async(req, res) => {
    try{
        const newPage = new Page(req.body)
        const savedPage = await newPage.save()
        res.status(201).json(savedPage)
    }catch(error) {
        res.status(400).json({message: 'Failed to create page', error})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const updatePage = await Page.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updatePage) return res.status(404).json({message: "page not found"})
        res.status(200).json(updatePage)
    }catch(error) {
        res.status(200).json({message: 'Failed to update page', error})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedPage = await Page.findByIdAndDelete(req.params.id);
        if(!deletedPage) return res.status(404).json({message: 'Page not found'})
        res.status(204).send()
    }catch(error) {
        res.status(400).json({message:'Failed to delete page', error})
    }
})

module.exports = router;