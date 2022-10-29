import { Schema, model, models } from "mongoose";
const LinkSchema = new Schema(
  {
    name: { type: String, required: true },
    links: { type: String, required: true },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "groups",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Links = models.Links || model("Links", LinkSchema);
export default Links;
