import { Student } from "../models/studentModel.js";
import { Mentor } from "../models/mentorModel.js";

// ✅ Create a new mentor
export const createMentor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Mentor name is required" });

    const mentor = new Mentor({ name });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ error: "Server error while creating mentor" });
  }
};

// ✅ Assign multiple students to a mentor
export const assignStudentsToMentor = async (req, res) => {
  try {
    const { mentorId, studentIds } = req.body;

    if (!mentorId || !Array.isArray(studentIds)) {
      return res.status(400).json({ error: "mentorId and studentIds[] are required" });
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });

    const students = await Student.find({ _id: { $in: studentIds }, currentMentor: null });

    for (const student of students) {
      student.currentMentor = mentorId;
      student.previousMentors.addToSet(mentorId);
      await student.save();
    }

    mentor.students.push(...students.map(s => s._id));
    await mentor.save();

    res.json({ message: "Students assigned", assignedStudents: students });
  } catch (err) {
    res.status(500).json({ error: "Server error while assigning students" });
  }
};

// ✅ Get all students for a mentor
export const getStudentsForMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate("students");
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });

    res.json(mentor.students);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching mentor's students" });
  }
};
