import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {
  generateOrderNumber,
  buildCallbackCard,
  buildOrderCard,
  sendGoogleChatNotification,
  type SiteInfo,
} from "./google-chat";

const REGION = "europe-central2";

const NAMI_SITE: SiteInfo = {
  siteName: "NAMI",
  domain: "nami.com.ua",
  orderPrefix: "NM-",
  productUrlPattern: "/product/:slug",
};

// ============================================
// Callback request handler
// ============================================

export const callback = onRequest(
  { region: REGION, cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { phone, productName, productSlug } = req.body;

      if (!phone) {
        res.status(400).json({ error: "Phone number is required" });
        return;
      }

      // Store in Firestore
      await admin.firestore().collection("callbacks").add({
        phone,
        productName: productName || null,
        productSlug: productSlug || null,
        domain: NAMI_SITE.domain,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: "pending",
      });

      // Send Google Chat notification
      const card = buildCallbackCard(NAMI_SITE, {
        phone,
        productName,
        productSlug,
      });
      await sendGoogleChatNotification(
        card,
        process.env.GOOGLE_CHAT_WEBHOOK_URL || ""
      );

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Callback error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ============================================
// Order submission handler
// ============================================

export const orders = onRequest(
  { region: REGION, cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderData = req.body;

      if (!orderData.items || !orderData.customer) {
        res.status(400).json({ error: "Invalid order data" });
        return;
      }

      const orderNumber = generateOrderNumber(NAMI_SITE.orderPrefix);

      // Store in Firestore
      await admin.firestore().collection("orders").add({
        ...orderData,
        orderNumber,
        domain: NAMI_SITE.domain,
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Send Google Chat notification
      const card = buildOrderCard(NAMI_SITE, orderNumber, {
        customer: orderData.customer,
        items: orderData.items,
        subtotalUsdCents: orderData.subtotalUsdCents,
        delivery: orderData.delivery,
        comment: orderData.comment,
      });
      await sendGoogleChatNotification(
        card,
        process.env.GOOGLE_CHAT_WEBHOOK_URL || ""
      );

      res.status(200).json({ success: true, orderId: orderNumber, orderNumber });
    } catch (error) {
      console.error("Order error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
