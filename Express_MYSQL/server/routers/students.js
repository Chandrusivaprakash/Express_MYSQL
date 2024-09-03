const express=require("express")
const router=express.Router()
const studentcontroller=require("../controllers/studentscontrollers")

//Show record
router.get("",studentcontroller.view)

//-------add record-----
// open the form
router.get("/adduser",studentcontroller.adduser)
router.post("/adduser",studentcontroller.addedsave)

//-------Update record---------
// open the form
router.get("/edituser/:id",studentcontroller.edituser)
router.post("/edituser/:id",studentcontroller.editeduser)

//Delete record
router.get("/Deleteuser/:id",studentcontroller.Deleteuser)

module.exports=router