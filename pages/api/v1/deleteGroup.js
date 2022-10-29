import connectMongo from "../../../utils/connectMongo";
import Groups from "../../../models//groupModel";
import Users from "../../../models/userModel";

export default async function deleteGroup(req, res) {
  if (req.method === "DELETE") {
    if (req.query.apiSecret === process.env.API_SECRET) {
      try {
        await connectMongo();
        const groupId = req.body.id;
        const group = await Groups.findByIdAndDelete(groupId);
        if (group) {
          const userId = group.createdBy;
          const user = await Users.findById(userId);
          let createdGroups = user.createdGroups;
          let index = createdGroups.indexOf(groupId);
          user.createdGroups.splice(index, 1);
          user.save();
          res.json({ group, user });
        }
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
    } else {
      res.json("Not Authorized to make API Request");
    }
  } else {
    res.json("Wrong Method");
  }
}
