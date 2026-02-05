app.post("/create_preference", async (req, res) => {
  try {

    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Items faltantes",
      });
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items,

        back_urls: {
          success: "https://www.google.com",
          failure: "https://www.google.com",
          pending: "https://www.google.com",
        },

        auto_return: "approved",
      },
    });

    res.status(200).json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });

  } catch (error) {

    console.error("PREFERENCE ERROR:", error);

    res.status(500).json({
      error: "Error creando preferencia",
      details: error.message,
    });

  }
});
