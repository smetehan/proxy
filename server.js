const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Kanal listesi
const channels = [
  { id: "1", name: "TR: BEIN SPORTS 1 SD", url: "https://202670.tonybox1.eu:80/sevketme2838/561j2is2zy/84" },
  { id: "2", name: "TR: BEIN SPORTS 2 HD", url: "http://202670.tonybox1.eu:80/sevketme2838/561j2is2zy/31408" },
  { id: "3", name: "TR: BEIN SPORTS 3 SD", url: "http://202670.tonybox1.eu:80/sevketme2838/561j2is2zy/116676" },
];

// Kanal listesini döndür
app.get("/api/channels", (req, res) => {
  res.json(channels.map(c => ({ id: c.id, name: c.name })));
});

// Kanal yayını proxy et
app.use("/stream/:id", (req, res, next) => {
  const channel = channels.find(c => c.id === req.params.id);
  if (!channel) {
    return res.status(404).send("Kanal bulunamadı");
  }

  return createProxyMiddleware({
    target: channel.url,
    changeOrigin: true,
    secure: false,
  })(req, res, next);
});

// Server başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`IPTV Proxy Server çalışıyor: http://localhost:${PORT}`);
});
