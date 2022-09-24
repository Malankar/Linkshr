import connectMongo from "../../../utils/connectMongo";
import Groups from "../../../models/groupModel";
import Users from "../../../models/userModel";
export default async function getGroupByUser(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      const getUser = await Users.findById(req.query.id);
      if (getUser) {
        const groupByUser = await Groups.find({ _id: getUser.createdGroups });
        const forkedByUser = await Groups.find({ _id: getUser.forkedGroups });
        res.status(200).json({ groupByUser, forkedByUser });
      } else {
        res.status(409).json({ msg: "Wrong ID" });
      }
    } catch (error) {
      console.log("Create One" + error);
      res.json({ msg: "ID Not Found", error });
    }
  } else {
    res.json("Wrong Method");
  }
}
