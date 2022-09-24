import { Schema, model, models } from "mongoose";
const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    links: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Groups = models.Groups || model("Groups", GroupSchema);
export default Groups;
