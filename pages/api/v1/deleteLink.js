import Groups from "../../../models/groupModel";
export default async function deleteLink(req, res) {
  if (req.method === "DELETE") {
    if (req.query.apiSecret === process.env.API_SECRET) {
      Groups.findByIdAndUpdate(
        req.query.id,
        { $pull: { links: { _id: req.body.id } } },
        function (err, model) {
          if (err) {
            console.log(err);
            return res.send(err);
          }
          return res.json(model);
        }
      );
    } else {
      res.json("Not Authorized to make API Request");
    }
  } else {
    res.json("Wrong Method");
  }
}
