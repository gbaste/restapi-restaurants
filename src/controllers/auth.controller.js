import { generateApiKey } from "../middlewares/middleware";

export const generateKey = async (req, res) => {
  const { name } = req.body;
  const apiKey = await generateApiKey(name);
  res.json(apiKey);
};
