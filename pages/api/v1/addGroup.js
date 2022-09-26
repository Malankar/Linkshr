import connectMongo from "../../../utils/connectMongo";
import Groups from "../../../models/groupModel";
import Users from "../../../models/userModel";

export default async function addGroup(req, res) {
  if (req.method === "POST") {
    if (req.query.apiSecret === process.env.API_SECRET) {
      try {
        await connectMongo();
        const getGroup = await Groups.find({ createdBy: req.body.createdBy });
        const data = getGroup.filter((data) => data.name == req.body.name);
        const getUser = await Users.findById(req.body.createdBy);
        if (data.length == 0) {
          const group = await Groups.create(req.body);
          getUser.createdGroups.push(group._id);
          getUser.save();
          res.status(200).json({ group, user: getUser });
        } else {
          res.status(409).json({ msg: "Aleardy Exists" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    } else {
      res.json("Not Authorized to make API Request");
    }
  } else {
    res.json("Wrong Method");
  }
}
