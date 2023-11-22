const mongoose = require("mongoose");

const paymentRecordSchema = new mongoose.Schema({
 tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tenantModel",
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
 
    houseRent: {
      type: Number,
      required: true,
    },
    washaBill: {
      type: Number,
      required: false,
    },
    cleanerBill: {
      type: Number,
      required: false,
    },
    gasBill: {
      type: Number,
      required: false,
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
  
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PaymentRecordModel", paymentRecordSchema);
