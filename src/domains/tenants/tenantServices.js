// tenantService.js
const tenantModel = require("./tenant");
const PaymentRecordModel = require("../payments/payment")
const flatModel = require("../flat/flat");
const moment = require("moment");

const createTenant = async ({ name, nationalId, contactNumber, email, address, description, inDate,flatId,houseRent, washaBill, gasBill, cleanerBill, extendableCharges, imageFile,documentFiles  }) => {


    // Convert image to base64
    const image = imageFile ? imageFile.buffer.toString("base64") : null;
     // Create an array of document objects
    const documents = documentFiles.map((file) => ({
        name: file.originalname,
        fileType: file.mimetype,
        fileReference: file.buffer.toString("base64"),
      }));

    const paymentInfo = {
        houseRent:houseRent,
        washaBill:washaBill,
        cleanerBill:cleanerBill,
        gasBill:gasBill,
        extendableCharges:extendableCharges
    }
    const newTenant = new tenantModel({
        name: name,
        description: description,
        nationalId:nationalId,
        contactNumber:contactNumber,
        email:email,
        address:address,
        inDate:inDate,
        flatId:flatId,
        paymentInfo:paymentInfo,
        image:image,
        documents:documents
    });

    try {
        await newTenant.save();
        return newTenant;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const updateTenant = async (id, {  name, nationalId, contactNumber, email, address, description, inDate,flatId,houseRent, washaBill, gasBill, extendableCharges }) => {
    const newTenant = {
            name: name,
            description: description,
            nationalId:nationalId,
            contactNumber:contactNumber,
            email:email,
            address:address,
            inDate:inDate,
            flatId:flatId
    };

    try {
        const updatedTenant = await tenantModel.findByIdAndUpdate(id, newTenant, { new: true });
        return updatedTenant;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const deleteTenant = async (id) => {
    try {
        const tenant = await tenantModel.findByIdAndRemove(id);
        return tenant;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const getTenants = async () => {
    try {
        const tenants = await tenantModel.find();
        return tenants;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const getAllTenantsWithPayments = async () => {
    try{

        const tenants = await tenantModel.find().populate('flatId');
        const currentMonth = moment().startOf('month');
        const paymentRecords = await PaymentRecordModel.find({
            tenant:{$in:tenants.map(tenant=>tenant._id)},
            paymentMonth:currentMonth,
        });

        const tenantsWithDetails = tenants.map(tenant=>{
            const paymentRecord = paymentRecords.find(record=>record.tenant.equals(tenant._id));
            return {
                tenant,
                flatDetails:tenant.flatId,
                paymentInfo:paymentRecord? paymentRecord.paymentDetails:null
            };
        });

        return tenantsWithDetails;

    }catch(error){
        throw new Error(`Error getting tenants with details: ${error.message}`);
    }
}

const getTenantDetails = async (id) => {
    try{

        const tenant = await tenantModel.findById(id).populate('flatId');
        if(!tenant){
            throw new Error("Tenant not found");
        }

        const currentMonth = moment().startOf('month');
        const paymentRecord = await PaymentRecordModel.findOne({
            tenant:tenant._id,
            paymentMOnth: currentMonth,
        });

        const tenantDetails = {
            tenant,
            flatDetails:tenant.flatId,
            paymentInfo:paymentRecord? paymentRecord.paymentDetails:null,
        };

        const paymentHistory = await PaymentRecordModel.find({
            tenant:tenant._id,
        })

        tenantDetails.paymentHistory = paymentHistory.map(record=>({
            paymentMonth:record.paymentMonth,
            paymentDetails:record,
        }))

        return tenantDetails;


    }catch(error){
        throw new Error(`Error getting a single tenants with details: ${error.message}`);
    }
}

  

module.exports = { createTenant, updateTenant, deleteTenant, getTenants,getAllTenantsWithPayments,getTenantDetails };
