import _ from "underscore";
import crypto from "crypto";
import { createOrUpdateOrder } from "./order.js";
import queryString from "query-string";

export const handleWebhook = async (req, res) => {
  const { data, event } = req.body;
  data.signatureKeys.sort();
  const objectSignaturePayload = _.pick(data, data.signatureKeys);

  const signaturePayload = queryString.stringify(objectSignaturePayload);

  const signature = crypto
    .createHmac("sha256", process.env.KASHIER_PAYMENTAPIKEY)
    .update(signaturePayload)
    .digest("hex");

  const kashierSignature = req.header("x-kashier-signature");

  if (kashierSignature === signature) {
    await createOrUpdateOrder({
      merchantOrderId: data.merchantOrderId,
      status: data.status,
      amount: data.amount,
      cart: data.metaData.cart,
      user: data.metaData.user,
    });
    res.send({ message: "Accepted" });
  } else {
    res.send({ message: "rejected" });
  }
};
