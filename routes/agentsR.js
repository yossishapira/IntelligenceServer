import express from "express";
import { getAgents,getAgentById,addAgent,updateAgent,deleteAgent } from "../ctrls/agentsC.js";
const router = express.Router();


router.get("/", getAgents);
router.get("/:id", getAgentById);
router.post("/",addAgent);
router.put("/:id",updateAgent)
router.delete("/:id",deleteAgent)

export default router;