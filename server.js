cat << 'EOF' > server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Replace with your real API key from the Pi Developer Portal
const PI_API_KEY = "Key d29qufadp7fbjt1tqqfuiagqpha86zxvkst139icpeuheqjsgipt0uylfs3dvmi";

app.post('/api/approve-payment', async (req, res) => {
    const { paymentId } = req.body;
    try {
        const response = await axios.post(
            `https://api.minepi.com/v2/payments/${paymentId}/approve`,
            {},
            { headers: { Authorization: PI_API_KEY } }
        );
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Approval fail:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: "Approval failed" });
    }
});

app.post('/api/complete-payment', async (req, res) => {
    const { paymentId, txid } = req.body;
    try {
        const response = await axios.post(
            `https://api.minepi.com/v2/payments/${paymentId}/complete`,
            { txid: txid },
            { headers: { Authorization: PI_API_KEY } }
        );
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Completion fail:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: "Completion failed" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend running live on port ${PORT}`));
EOF
