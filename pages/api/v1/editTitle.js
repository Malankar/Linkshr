import connectMongo from "../../../utils/connectMongo";
import Groups from "../../../models/groupModel";

export default async function editTitle(req, res) {
  if (req.method === "PATCH") {
    if (req.query.apiSecret === process.env.API_SECRET) {
      try {
        await connectMongo();
        const getGroup = await Groups.findById(req.body.id);
        const group = await Groups.find({ name: req.body.name });
        if (group[0]?.createdBy !== req.body.createdBy) {
          getGroup.name = req.body.name;
          getGroup.save();
          res.status(200).json({ group: getGroup });
        } else {
          res.status(409).json({ msg: "Group name already in use" });
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
