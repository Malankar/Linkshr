import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/userModel";
export default async function forgotPass(req, res) {
  if (req.method === "POST") {
    if (req.query.apiSecret === process.env.API_SECRET) {
      try {
        await connectMongo();
        const getUser = await Users.find({ email: req.body.email });
        if (getUser) {
          res.status(200).json({ data: getUser });
        } else {
          res.status(404).json({ msg: "Wrong Email" });
        }
      } catch (error) {
        res.status(500).json({ msg: "Server Error", error });
      }
    } else {
      res.json("Not Authorized to make API Request");
    }
  } else {
    res.json("Wrong Method");
  }
}
