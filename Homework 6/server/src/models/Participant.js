import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  event_id: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
});

export default mongoose.model("Participant", ParticipantSchema);
