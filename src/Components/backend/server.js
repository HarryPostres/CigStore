import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   CONFIG MP
================================ */

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

/* ===============================
   CREAR PREFERENCIA
================================ */

app.post("/create_preference", async (req, res) => {
  try {
    const { items, orderId } = req.body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items,

        back_urls: {
          success: "cigstore://success",
          failure: "cigstore://failure",
          pending: "cigstore://pending",
        },

        auto_return: "approved",

        external_reference: orderId,
      },
    });

    res.json({
      id: result.id,
      init_point: result.init_point,
    });

  } catch (error) {
    console.log("MP SERVER ERROR:", error);

    res.status(500).json({
      error: "Error creando preferencia",
    });
  }
});

/* ===============================
   SERVER
================================ */

app.listen(3000, () => {
  console.log("Servidor MP corriendo en puerto 3000");
});

