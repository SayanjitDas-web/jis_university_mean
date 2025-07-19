const router = require("express").Router()
const { register, login, getMe, logout } = require("../controllers/user.controller")
const auth = require("../middlewares/auth")

router.post("/register",register)
router.post("/login",login)

router.get("/me",auth, getMe)
router.get("/logout",auth, logout)

module.exports = router