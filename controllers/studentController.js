import { Student } from "../models/studentModel.js";
import { Mentor } from "../models/mentorModel.js";

export const createStudent = async (req, res) => {
  const { name } = req.body;
  const student = new Student({ name });
  await student.save();
  res.status(201).json(student);
};

export const getUnassignedStudents = async (req, res) => {
  const students = await Student.find({ currentMentor: null });
  res.json(students);
};

export const assignOrChangeMentor = async (req, res) => {
  const { studentId, mentorId } = req.body;

  const student = await Student.findById(studentId);
  const newMentor = await Mentor.findById(mentorId);

  if (student.currentMentor) {
    const oldMentor = await Mentor.findById(student.currentMentor);
    oldMentor.students.pull(studentId);
    await oldMentor.save();
  }

  student.currentMentor = mentorId;
  student.previousMentors.addToSet(mentorId);
  await student.save();

  newMentor.students.addToSet(studentId);
  await newMentor.save();

  res.json({ message: "Mentor assigned/changed", student });
};

export const getPreviousMentors = async (req, res) => {
  const student = await Student.findById(req.params.id).populate('previousMentors');
  res.json(student.previousMentors);
};
