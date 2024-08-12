import axios from "axios";

export async function createInvoice(req, res) {
  await axios
    .post(
      "https://test-api.kashier.io/paymentRequest?currency=EGP",
      {
        ...req.body,
      },
      {
        headers: {
          Authorization: `${process.env.KASHIER_SECERT}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    });
}
