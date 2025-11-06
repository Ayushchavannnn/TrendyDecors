// const express = require("express");
// const router = express.Router();
// const vendorController = require("../controllers/vendor-controller");
// const validate = require("../middlewares/validate-middleware");
// const {signupSchema, loginSchema} = require("../validators/auth-validator");
// const VendorMiddleware = require("../middlewares/vendor-middleware");

// router.route("/").get(vendorController.home);
// router
//   .route("/register")
//   .post(validate(signupSchema), vendorController.register);
//   router.route("/login").post(validate(loginSchema), vendorController.login);

//   router.route("/user").get(VendorMiddleware, vendorController.user);

// module.exports = router;