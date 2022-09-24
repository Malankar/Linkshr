import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/userModel";
export default async function loginUser(req, res) {
  if (req.method === "POST") {
    const getUser = await Users.find({ email: req.body.email });
    if (getUser) {
      if (req.body.password == getUser[0].password) {
        console.log("user signed in");
        res.status(200).json({ user: getUser[0] });
      } else {
        res.status(401).json({ msg: "Wrong Password" });
      }
    } else {
      res.status(400).json({ msg: "User Not found" });
    }
  } else {
    res.json("Wrong Method");
  }
}
