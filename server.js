// proxy-server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Tüm CORS izinleri
app.use(cors());

// Basit GET proxy
app.get("/proxy", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send({ error: "URL parametresi eksik" });
  }

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // Video veya M3U gibi binary içeriğe izin
    });

    // İçeriğin tipini aynen döndür
    res.set("Content-Type", response.headers["content-type"] || "application/octet-stream");
    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).send({ error: "Proxy isteği başarısız" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
