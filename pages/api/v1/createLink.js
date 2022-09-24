import connectMongo from "../../../utils/connectMongo";
import Groups from "../../../models/groupModel";
export default async function addLink(req, res) {
  if (req.method === "PATCH") {
    try {
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      const group = await Groups.findById(req.query.id);
      if (group == null) console.log("Not found");
      const data = group.links.filter(
        (data) => data.link == req.body.link || data.title == req.body.title
      );
      if (data.length === 0 && group !== null) {
        group?.links.push(req.body);
        group.save();
        res.status(200).json({ group });
      } else {
        res.status(409).json("This Link exists in that group");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.json("Wrong Method");
  }
}
