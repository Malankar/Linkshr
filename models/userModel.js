import { Schema, model, models } from "mongoose";
const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdGroups: [{ type: Schema.Types.ObjectId, ref: "Groups" }],
    forkedGroups: [{ type: Schema.Types.ObjectId, ref: "Groups" }],
  },
  {
    timestamps: true,
  }
);

const Users = models.Users || model("Users", UserSchema);
export default Users;
