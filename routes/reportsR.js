import express from "express";
import { getReports,getReportsById,addReports,updateReport,deleteReport } from "../ctrls/reportsC.js";
import { validateUser } from "../utils/utils.js";
const router = express.Router();


router.get("/",validateUser, getReports);
router.get("/:id",validateUser, getReportsById);
router.post("/",validateUser,addReports);
router.put("/:id",validateUser,updateReport)
router.delete("/:id",validateUser,deleteReport)

export default router;