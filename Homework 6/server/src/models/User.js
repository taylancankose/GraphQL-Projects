import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  attended_events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export default mongoose.model("User", UserSchema);
