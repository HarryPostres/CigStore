import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
  console.error('Falta MP_ACCESS_TOKEN en el .env');
  process.exit(1);
}

const client = new MercadoPagoConfig({
  accessToken,
});

const defaultBackUrls = {
  success: process.env.MP_BACK_URL_SUCCESS || 'https://www.mercadopago.com.ar',
  failure: process.env.MP_BACK_URL_FAILURE || 'https://www.mercadopago.com.ar',
  pending: process.env.MP_BACK_URL_PENDING || 'https://www.mercadopago.com.ar',
};

const isValidHttpUrl = (value) => {
  if (typeof value !== 'string' || value.trim().length === 0) return false;

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post('/create_preference', async (req, res) => {
  try {
    const { items, orderId, backUrls } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Items faltantes',
      });
    }

    const parsedBackUrls = {
      success: isValidUrl(backUrls?.success) ? backUrls.success : defaultBackUrls.success,
      failure: isValidUrl(backUrls?.failure) ? backUrls.failure : defaultBackUrls.failure,
      pending: isValidUrl(backUrls?.pending) ? backUrls.pending : defaultBackUrls.pending,
    };

    const preferenceBody= {
      items,
      external_reference: orderId,
      back_urls:parsedBackUrls,
    }
    if (isValidHttpUrl(parsedBackUrls.success)){
      preferenceBody.auto_return = 'approved';
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: preferenceBody,
    });

    res.status(200).json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });

  } catch (error) {
    console.error('PREFERENCE ERROR:', error);

    res.status(500).json({
      error: 'Error creando preferencia',
      details: error?.message,
      cause: error?.cause,
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend MP escuchando en http://0.0.0.0:${PORT}`);
});