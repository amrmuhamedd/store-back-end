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
    if (data.metaData.cart?.length > 0 && data.metaData.user?._id) {
      await createOrUpdateOrder({
        merchantOrderId: data.merchantOrderId,
        status: data.status,
        amount: data.amount,
        cart: data.metaData.cart,
        user: data.metaData.user,
      });
    }
    console.log(data.metaData);
    res.send({ message: "Accepted" });
  } else {
    res.send({ message: "rejected" });
  }
};
