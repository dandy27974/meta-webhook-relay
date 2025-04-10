
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const TARGET_URL = process.env.TARGET_URL;

app.use(express.json());

// ✅ Проверка Webhook'а от Meta (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✔️ Webhook Verified");
    res.status(200).send(challenge);
  } else {
    console.log("❌ Webhook Verification Failed");
    res.sendStatus(403);
  }
});

// 📩 Прием событий от Meta и пересылка в n8n
app.post("/webhook", async (req, res) => {
  try {
    console.log("📨 Incoming:", JSON.stringify(req.body));
    await axios.post(TARGET_URL, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌
