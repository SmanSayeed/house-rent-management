const mongoose = require("mongoose");

const paymentRecordSchema = new mongoose.Schema({
 tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
      },
  paymentStatus: {
    type: Boolean,
    required: true,
  },
  paymentMonth: {
    type: Date,
    required: true,
  },
  paymentDetails: {
    houseRent: {
      type: Number,
      required: true,
    },
    washaBill: {
      type: Number,
      required: true,
    },
    cleanerBill: {
      type: Number,
      required: true,
    },
    gasBill: {
      type: Number,
      required: true,
    },
    extendableCharges: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PaymentRecordModel", paymentRecordSchema);
