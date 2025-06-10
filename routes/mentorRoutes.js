import express from "express";
import { assignStudentsToMentor, createMentor, getStudentsForMentor } from "../controllers/mentorController.js";

const router = express.Router();

// ✅ TEST ROUTE to confirm deployed API works
router.get('/ping', (req, res) => {
  res.json({ message: "Mentor route is working ✅" });
});

router.post('/', createMentor);
router.post('/assign-students', assignStudentsToMentor);
router.get('/:id/students', getStudentsForMentor);

export default router;
