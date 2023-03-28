const router = require("express").Router()
const userForm = require("../controllers/userForm")
const { validate } = require('../middlewares/validate')
const { auth } = require("../middlewares/auth")


router.post("/create", validate("body", userForm.createForm.validation), userForm.createForm.handler)
router.put("/update", validate("body", userForm.updateUserForm.validation), userForm.updateUserForm.handler)
router.get("/find", userForm.getUserForm.handler)
router.delete("/delete", userForm.deleteUserForm.handler)

module.exports = router