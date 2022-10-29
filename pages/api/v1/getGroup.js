import connectMongo from "../../../utils/connectMongo";
import Groups from "../../../models/groupModel";
import Users from "../../../models/userModel";
export default async function getGroupByUser(req, res) {
  if (req.method === "GET") {
    if (req.query.apiSecret === process.env.API_SECRET) {
      try {
        await connectMongo();
        const getUser = await Users.findById(req.query.id).populate([
          { path: "createdGroups" },
          { path: "forkedGroups" },
        ]);
        if (getUser) {
          const groupByUser = getUser.createdGroups;
          const forkedByUser = getUser.forkedGroups;
          res.status(200).json({ groupByUser, forkedByUser });
        } else {
          res.status(409).json({ msg: "Wrong ID" });
        }
      } catch (error) {
        res.json({ msg: "ID Not Found", error });
      }
    } else {
      res.json("Not Authorized to make API Request");
    }
  } else {
    res.json("Wrong Method");
  }
}
