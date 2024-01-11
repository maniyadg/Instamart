const shippingModel = require("../models/shippingModel");
const userModel = require("../models/userModel");


const addAddress = async (req, res) => {
    try {
        const { name, address, phoneNo, city, country, postalCode } = req.body;

        req.body.user = req.user._id;
        console.log(req.body.username)
        // Vallidations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!address) {
            return res.send({ error: "E-Mail is Required" });
        }

        if (!phoneNo) {
            return res.send({ error: "Password is Required" });
        }

        if (!country) {
            return res.send({ error: "Name is Required" });
        }
        if (!city) {
            return res.send({ error: "E-Mail is Required" });
        }

        if (!postalCode) {
            return res.send({ error: "Password is Required" });
        }

        // Check Address 

        const extistingAddress = await userModel.findOne({ address })

        if (extistingAddress) {
            return res.status(200).send({
                success: false,
                message: "Address Already Exists"
            })
        }

        const shipping = await new shippingModel({
            name,
            address,
            country,
            city,
            phoneNo,
            postalCode,
            user: req.user._id
        }).save()


        res.status(201).send({
            success: true,
            message: "Address Details Added successfully",
            shipping
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}

const editAddress = async (req, res) => {
    try {
        const { name, address, phoneNo, city, country, postalCode } = req.body;

        req.body.username = req.user.username;
        // Vallidations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!address) {
            return res.send({ error: "E-Mail is Required" });
        }

        if (!phoneNo) {
            return res.send({ error: "Password is Required" });
        }

        if (!country) {
            return res.send({ error: "Name is Required" });
        }
        if (!city) {
            return res.send({ error: "E-Mail is Required" });
        }

        if (!postalCode) {
            return res.send({ error: "Password is Required" });
        }



        const shipping = await shippingModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })



        res.status(201).send({
            success: true,
            message: "Address Details Updated successfully",
            shipping
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const address = await shippingModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: 'Address Deleted Successfully',
            address
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }

}

const getAddress = async (req, res) => {
    try {
        const user = await userModel.find({ _id: req.user._id })
        const shipping = await shippingModel.find({ user }).populate('user')
        res.status(200).send({
            success: true,
            message: 'address found successfully',
            shipping
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            })
    }

}

module.exports = { addAddress, editAddress, deleteAddress, getAddress }
