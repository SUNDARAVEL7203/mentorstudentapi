import express, { Router } from "express"
import { assignStudentsToMentor, createMentor, getStudentsForMentor } from "../controllers/mentorController.js";

const router = express.Router();


router.post('/', createMentor );
router.post('/assign-students', assignStudentsToMentor);
router.get('/:id/students', getStudentsForMentor);

export default router;
