const urlMetadata = require("url-metadata");
export default async function getTitle(req, res) {
  try {
    const data = await urlMetadata(req.query.url);
    res.status(200).json({ title: data.title, source: data.source });
  } catch (error) {
    res.status(400).json({ error });
  }
}
