import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/userModel";

export default async function addUser(req, res) {
  if (req.method === "POST") {
    if (req.query.apiSecret === process.env.API_SECRET) {
      try {
        await connectMongo();

        const user = await Users.create(req.body);
        console.log("User Created");

        res.status(200).json({ user });
      } catch (error) {
        res.status(409).json({ error });
      }
    } else {
      res.json("Not Authorized to make API Request");
    }
  } else {
    res.json("Wrong Method");
  }
}
