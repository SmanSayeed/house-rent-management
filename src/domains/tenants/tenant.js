const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileReference: {
        type: String, // Assuming you store the file reference (URL or path) as a string
        required: true,
    },
});


const paymentInfoSchema = 
    {
        houseRent: {
            type: Number,
            required: false,
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
}
;

const paymentRecordSchema = new mongoose.Schema({
    paymentStatus:{
        type:Boolean,
        required:true
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



const tenantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nationalId: {
        type: String,
        required: false,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    paymentInfo:paymentInfoSchema,
   
    description: {
        type: String,
        required: false,
    },

    inDate: {
        type: Date,
        required: false,
    },
    outDate: {
        type: Date,
        required: false,
    },
    flatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"flatModel",
        required:false,
        unique: true, // Ensure flatId is unique for each tenant
    },
    image: {
        type: String, // Assuming you store the image URL or path as a string
    },
    documents: [documentSchema],
    paymentRecordIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PaymentRecord",
        },
      ], // Reference to paymentRecord documents
},{timestamps:true});

module.exports = mongoose.model("tenantModel",tenantSchema);