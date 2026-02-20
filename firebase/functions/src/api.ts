import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

const REGION = "europe-central2";

export const callback = onRequest(
  { region: REGION, cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ error: "Phone number is required" });
      return;
    }
    await admin.firestore().collection("callbacks").add({
      phone,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "pending",
    });
    res.status(200).json({ success: true });
  }
);

export const orders = onRequest(
  { region: REGION, cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    const orderData = req.body;
    if (!orderData.items || !orderData.customer) {
      res.status(400).json({ error: "Invalid order data" });
      return;
    }
    const orderNumber = `NM-${String(Date.now()).slice(-6)}`;
    const orderRef = await admin.firestore().collection("orders").add({
      ...orderData,
      orderNumber,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ success: true, orderId: orderRef.id, orderNumber });
  }
);
