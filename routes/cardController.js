const express = require('express');
const router = express.Router();

const dbCard = require('../models/card')
const dbListPet = require('../models/listPet')

router.get('/', (req, res) => {
    dbCard.find({}, (err, docs) => {
        res.json(docs)
    })
})

router.post('/post', async (req, res) => {
    let listProduct = []
    const items = req.body.listProduct

    for (let i = 0; i < items.length; i++) {
        let item = await dbListPet.findById(items[i])
        listProduct.push(item)
    }

    const prod = new dbCard({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        note: req.body.note,
        total: req.body.total,
        listProduct: listProduct,

    })
    prod.save().then(() => {
        res.status(200).json("Oder success")
    })
})

router.delete('/delete', async (req, res) => {
    const id = req.body.id;
    await dbCard.deleteOne({ _id: id })
    res.status(200).json("Confirm Order success")
})
module.exports = router;