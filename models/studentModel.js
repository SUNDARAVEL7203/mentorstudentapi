import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  name: 
  { type: String, 
    required: true 
},
  currentMentor: 
  { type: mongoose.Schema.Types.ObjectId,
     ref: 'Mentor' 
  },
  previousMentors: 
  [
    { type: mongoose.Schema.Types.ObjectId,
     ref: 'Mentor' 
    }
]
});

export const Student = mongoose.model("Student", studentSchema)
