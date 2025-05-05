const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 8386;

// Middleware
app.use(cors());
app.use(express.json());

// --- Config Circa API ---
const CIRCA_API_URL = "https://api.v2.circa.vn/v1/pos/5976e784-3be9-4504-8b8f-cb28424cbeb2/qr/";
const AUTHORIZATION_TOKEN = "Bearer eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiaXNzIjoiQnV5bWVkLUFQIiwidG9rZW4iOiI2bDU1WEhBNmc0QzF2cks2dDJNSjY2RkI4QTgycGx2bm1VR1BKTmthYzR5M1ZlRGwiLCJjbGllbnQiOiIzVlZHV0ZaSTNlMjdlVGFTdjJXOGU5dFRBSEN1QXQ5cDZkN2hFMUpQUXI0clA4cDEifQo=";

// --- API route ---
app.get('/api/fetch-product', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing product code" });
  }

  try {
    const response = await axios.get(`${CIRCA_API_URL}${code}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "vi-VN",
        authorization: AUTHORIZATION_TOKEN,
        origin: "https://pos.v2.circa.vn",
        referer: "https://pos.v2.circa.vn/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "grpc-timeout": "30S",
        "sec-ch-ua": `"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        DNT: "1",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Circa API:", error.message);
    res.status(500).json({ error: "Failed to fetch product data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
