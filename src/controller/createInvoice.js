import axios from "axios";

export async function createInvoice(req, res) {
  const response = await axios.post(
    "https://test-api.kashier.io/paymentRequest?currency=EGP",
    {
      ...req.body,
    },
    {
      headers: {
        Authorization: `${process.env.KASHIER_SECERT}`,
      },
    }
  );
  console.log(response.data);
  res.send(response.data);
}
