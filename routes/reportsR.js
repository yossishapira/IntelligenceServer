import express from "express";
import { getReports,getReportsById,addReports,updateReport,deleteReport } from "../ctrls/reportsC.js";
const router = express.Router();


router.get("/", getReports);
router.get("/:id", getReportsById);
router.post("/",addReports);
router.put("/:id",updateReport)
router.delete("/:id",deleteReport)

export default router;