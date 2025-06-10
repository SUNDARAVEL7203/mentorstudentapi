import { Student } from "../models/studentModel.js";
import { Mentor } from "../models/mentorModel.js";


export const createMentor = async (req, res) => {
  const { name } = req.body;
  const mentor = new Mentor({ name });
  await mentor.save();
  res.status(201).json(mentor);
};

export const assignStudentsToMentor = async (req, res) => {
  const { mentorId, studentIds } = req.body;
  const mentor = await Mentor.findById(mentorId);
  const students = await Student.find({ _id: { $in: studentIds }, currentMentor: null });

  students.forEach(student => {
    student.currentMentor = mentorId;
    student.previousMentors.push(mentorId);
  });

  await Promise.all(students.map(s => s.save()));

  mentor.students.push(...studentIds);
  await mentor.save();

  res.json({ message: "Students assigned", mentor });
};

export const getStudentsForMentor = async (req, res) => {
  const mentor = await Mentor.findById(req.params.id).populate('students');
  res.json(mentor.students);
};
