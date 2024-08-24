import mongoose from "mongoose";
import { Schema } from "mongoose";

const MeetingSchema = new Schema({
  user_id: { type: String, required: true },
  meetingCode: { type: String, required: true },
  date: { type: String, required: true , default:Date.now},
  
});

const Meeting= mongoose.model("Meeting", MeetingSchema);
export { Meeting };
