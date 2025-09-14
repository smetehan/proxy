import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
  const { target } = req.query;
  if (!target) return res.status(400).send("target query missing");

  try {
    const response = await axios.get(target, {
      responseType: "stream", // büyük dosyalar için
    });
    response.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy fetch failed");
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
