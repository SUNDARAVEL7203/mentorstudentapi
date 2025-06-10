import express, { Router } from "express";
import { assignOrChangeMentor, createStudent, getPreviousMentors, getUnassignedStudents } from "../controllers/studentController.js";

const router = express.Router();

router.post('/', createStudent);
router.get('/unassigned', getUnassignedStudents);
router.post('/assign-mentor', assignOrChangeMentor);
router.get('/:id/previous-mentors', getPreviousMentors);

export default router;
