const express = require("express");
const { createPaymentRecordForTenant,  updatePaymentRecord,
    deletePaymentRecord,
    changePaymentStatus,getPayments } = require("./paymentController.js");
const auth = require("../../middleware/auth.js");
const { validatePayment, validate } = require("./paymentValidator.js");
const paymentRouter = express.Router();

paymentRouter.get("/",auth,getPayments);

paymentRouter.get("/tenant-payments/:tenantId",auth,getPayments);

paymentRouter.get("/all-payments-by-month/:year/:month/:tenantId",auth,getPayments);

paymentRouter.post("/",auth,validate ,createPaymentRecordForTenant);

paymentRouter.put("/:id",auth, validate ,updatePaymentRecord);

paymentRouter.delete("/:id",auth,deletePaymentRecord);

paymentRouter.put("/change-payment-status/:id",auth,changePaymentStatus);



module.exports = paymentRouter;