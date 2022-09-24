import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/userModel";

export default async function addUser(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongo();
      console.log("CONNECTED TO MONGO");

      const user = await Users.create(req.body);
      console.log("User Created");

      res.json({ user });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else {
    res.json("Wrong Method");
  }
}
