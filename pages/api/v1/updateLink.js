import Groups from "../../../models/groupModel";
export default async function updateLink(req, res) {
  if (req.method === "PATCH") {
    Groups.updateOne(
      { "links._id": req.body.id },
      {
        $set: {
          "links.$.title": req.body.title,
          "links.$.link": req.body.link,
          name: req.body.name,
        },
      },
      function (err, model) {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          return res.status(200).json(model);
        }
      }
    );
  } else {
    res.json("Wrong Method");
  }
}
