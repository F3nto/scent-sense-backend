const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OkzgqImpQsfXZBiQ1vrnehEYdhftTiCa8TtdZphbi0ND33EBHmLOdX4ztN1kKtktyhgEHQfhjBzkcbTeDEaRwXF00Ia2R5LkA"
);

const router = express.Router();

router.use(cors());
router.use(express.static("public"));

router.post("/", cors(), async (req, res) => {
  const { product, allTotalPrice } = req.body;
  console.log("productsssss....", product, allTotalPrice);
  const lineItems = product.map((product) => ({
    // name : product.name,
    // price : allTotalPrice,
    // quantity: product.qty,.
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  console.log("session....", session)
  res.json({ id: session.id });
});

module.exports = router;
