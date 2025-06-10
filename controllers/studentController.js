import { Student } from "../models/studentModel.js";
import { Mentor } from "../models/mentorModel.js";

// ✅ Create a student
export const createStudent = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Student name is required" });

    const student = new Student({ name });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error while creating student" });
  }
};

// ✅ Get unassigned students
export const getUnassignedStudents = async (req, res) => {
  try {
    const students = await Student.find({ currentMentor: null });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching unassigned students" });
  }
};

// ✅ Assign or change mentor for a student
export const assignOrChangeMentor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    if (!studentId || !mentorId) {
      return res.status(400).json({ error: "studentId and mentorId are required" });
    }

    const student = await Student.findById(studentId);
    const newMentor = await Mentor.findById(mentorId);

    if (!student || !newMentor) {
      return res.status(404).json({ error: "Student or Mentor not found" });
    }

    // Remove from old mentor if exists
    if (student.currentMentor) {
      const oldMentor = await Mentor.findById(student.currentMentor);
      oldMentor.students.pull(studentId);
      await oldMentor.save();
    }

    // Assign new mentor
    student.currentMentor = mentorId;
    student.previousMentors.addToSet(mentorId);
    await student.save();

    newMentor.students.addToSet(studentId);
    await newMentor.save();

    res.json({ message: "Mentor assigned/changed", student });
  } catch (err) {
    res.status(500).json({ error: "Server error while assigning mentor" });
  }
};

// ✅ Get previous mentors for a student
export const getPreviousMentors = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("previousMentors");
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student.previousMentors);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching previous mentors" });
  }
};
