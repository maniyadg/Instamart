const Product = require("../models/postModel.js");
const userModel = require('../models/userModel')
const categoryModel = require("../models/categoryModel.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");

// create Product
const createProduct = catchAsyncError(async (req, res) => {
  try {
    let images = []
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.files.length > 0) {
      req.files.forEach(file => {
        let url = `${BASE_URL}/uploads/product/${file.originalname}`;
        images.push({ image: url })
      })
    }

    req.body.images = images;

    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product
    });
  } catch (error) {
    console.log({ "error ": error });
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
});

// get my posts
const getPosts = catchAsyncError(async(req,res) => {
  try {
    const user = await userModel.find({ _id: req.user._id });
    const products = await Product.find({ user }).populate("user");
    res.status(200).send({
      success: true,
      user,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
})

//get all products
const getProduct = async (req, res) => {
  try {
    const products = await Product
      .find({ user: { $ne: req.user._id }})
      .populate("category")
      .populate("user")
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product
      .findById(req.params.id)
      .populate("category")
      .populate("user")
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
const productPhoto = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
const productList = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "Search Products ",
        products,
      });  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
const realtedProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
const productCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ name: req.params.name });
    const products = await Product.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

// get prdocyst by user
const productuser = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.name });
    const products = await postModel.find({ user }).populate("user");
    res.status(200).send({
      success: true,
      user,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

// Like post
const likePost = async (req,res) =>{
  try {
    const post = await Product.find({_id: req.params.id, likes: req.user._id});
    if(post.length > 0)
        return res.status(400).json({msg: "You already liked this Post!"})

    const like = await Product.findOneAndUpdate({_id: req.params.id}, {
        $push: {likes: req.user._id}
    }, {new: true})

    if(!like)
        return res.status(400).json({msg: "This Post does not exist"})

    res.json({
        msg: "Post Liked!"
    })
} catch (err) {
    return res.status(500).json({msg: err.message})
}
}

// UnLike Post
const unLikePost = async (req,res) =>{
  try {
    const like = await Product.findOneAndUpdate({_id: req.params.id}, {
        $pull: {likes: req.user._id}
    }, {new: true})

    if(!like)
        return res.status(400).json({msg: "This Post does not exist"})

    res.json({
        msg: "Post Unliked!"
    })
} catch (err) {
    return res.status(500).json({msg: err.message})
}
}

module.exports = { createProduct, getProduct, productCategory, productuser, searchProduct ,getSingleProduct ,getPosts , likePost , unLikePost}