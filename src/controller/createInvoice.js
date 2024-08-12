import axios from "axios";

export async function createInvoice(req, res) {
  try {
    const response = await axios.post(
      "https://test-api.kashier.io/paymentRequest?currency=EGP",
      req.body,
      {
        headers: {
          Authorization: `${process.env.KASHIER_SECERT}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Failed to create invoice" });
  }
}
