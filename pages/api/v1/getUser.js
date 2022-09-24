import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/userModel";
export default async function addGroup(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      const getUser = await Users.findById(req.query.id);
      if (getUser) {
        res.status(200).json({ user: getUser });
      } else {
        res.status(409).json({ msg: "Wrong ID" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Server Error", error });
    }
  } else {
    res.json("Wrong Method");
  }
}
