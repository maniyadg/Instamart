const express = require("express");
const { createCategory , category, updateCategory, singleCategory, deleteCategory } = require("../controllers/categoryController");
const { isAuth } = require("../utills/auth");

const router = express.Router()

// create category route

router.post('/create-category' , createCategory)

  //getALl category
  router.get("/get-category", category);

  
//update category
router.put(
  "/update-category/:id",
  isAuth,
  updateCategory
);

//single category
router.get("/single-category/:name", singleCategory);

//delete category
router.delete(
  "/delete-category/:id",
  isAuth,
  deleteCategory
);

module.exports = router