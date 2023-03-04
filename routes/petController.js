const express = require('express');
const router = express.Router();

const dbListPet = require('../models/listPet')

router.get('/', (req, res) => {
    dbListPet.find({}, (err, docs) => {
        res.json(docs)
    })
})
router.get('/detail/:id', (req, res) => {
    dbListPet.findById(req.params.id, (err, docs) => {
        res.json(docs)
    })
})
router.get('/type/tivi', (req, res) => {
    dbListPet.find({ type: 'tivi' }, (err, docs) => {
        res.json(docs)
    })
})

router.get('/type/fridge', (req, res) => {
    dbListPet.find({ type: 'fridge' }, (err, docs) => {
        res.json(docs)
    })
})

router.post('/post', async (req, res) => {
    console.log(req.body)

    const checkProd = await dbListPet.findOne({ name: req.body.nameProduct })


    if (checkProd == null) {
        const prod = new dbListPet({
            imageOne: req.body.imgOne,
            imageTwo: req.body.imgTwo,
            imageThree: req.body.imgThree,
            imageFour: req.body.imgFour,
            name: req.body.nameProduct,
            price: req.body.priceProduct,
            type: req.body.typeProduct,
            detail: req.body.detailProduct
        })

        prod.save().then(() => {
            res.status(200).json("create product success")
        })
            .catch((err) => {
                if (err) throw err;
            });
    }
    else {
        res.status(400).json('This name already has a Product')
    }
})

router.delete('/delete', async (req, res) => {
    const id = req.body.id;
    await dbListPet.deleteOne({ _id: id })
    res.status(200).json("delete product success")
})

module.exports = router;