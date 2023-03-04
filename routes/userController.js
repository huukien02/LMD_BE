const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const dbUser = require('../models/user')

router.get('/', (req, res) => {
    dbUser.find({}, (err, docs) => {
        res.json(docs)
    })
})

router.post('/login', async (req, res) => {

    try {
        const checkUser = await dbUser.findOne({ username: req.body.username, password: req.body.password })

        if (checkUser == null) {
            return res.status(403).json('Tài khoản hoặc mật khẩu không chính xác')

        }
        else {
            let infor = {
                id: checkUser._id,
                username: checkUser.username,
                email: checkUser.email,
                avatar: checkUser.avatar,
                role: checkUser.role
            }

            let token = jwt.sign(infor, 'suyt');

            return res.status(200).json({
                message: 'Login thành công',
                token: token
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

})

router.post('/signup', async (req, res) => {
    const checkUser = await dbUser.findOne({ username: req.body.username })


    if (checkUser == null) {
        const user = new dbUser({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: 'user'
        })

        user.save().then(() => {
            res.status(200).json("create user success")
        })
            .catch((err) => {
                if (err) throw err;
            });
    }
    else {
        res.status(400).json('This name already has a user')
    }


})

router.delete('/delete', async (req, res) => {
    const id = req.body.id;
    await dbUser.deleteOne({ _id: id })
    res.status(200).json("delete user success")
})

/* UPDATE */
router.put('/update', async (req, res, next) => {
    try {

        await dbUser.updateOne({ _id: req.body.data.currentIdUser },
            {
                email: req.body.data.currentEmail,
                username: req.body.data.currentUsername,
                password: req.body.data.currentPassword,

            })
        res.status(200).json("Update thành công")

    } catch (err) {
        return res.status(400).json(err);
    }

});

module.exports = router;