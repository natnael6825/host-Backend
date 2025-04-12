import { Router

 } from "express";
 import { createIssueReport,getAllIssueReports,getIssueReportById } from "../controllers/report.js";
const router = Router();

// Create a new issue report
router.post('/', createIssueReport);

// Get all issue reports
router.get('/', getAllIssueReports);

// Get a specific issue report by ID
router.get('/:id', getIssueReportById);

export default router;