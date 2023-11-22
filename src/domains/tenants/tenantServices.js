// tenantService.js
const tenantModel = require("./tenant");
const PaymentRecordModel = require("../payments/payment")

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

const createPaymentRecordForTenant = async (tenantId, paymentRecordData) => {
    try {
      const tenant = await tenantModel.findById(tenantId);
  
      // Create payment record
      const paymentRecord = await PaymentRecordModel.create({
        tenant: tenantId,
        ...paymentRecordData,
      });
  
      // Update tenant's paymentRecordIds array
      tenant.paymentRecordIds.push(paymentRecord._id);
      await tenant.save();
  
      return paymentRecord;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating payment record for tenant");
    }
  };

  const updatePaymentRecord = async (tenantId, paymentRecordId, updatedData) => {
    try {
      const updatedPaymentRecord = await PaymentRecordModel.findByIdAndUpdate(
        paymentRecordId,
        updatedData,
        { new: true }
      );
      return updatedPaymentRecord;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating payment record");
    }
  };
  
  const deletePaymentRecord = async (tenantId, paymentRecordId) => {
    try {
      // Remove payment record from PaymentRecord collection
      await PaymentRecordModel.findByIdAndRemove(paymentRecordId);
  
      // Remove payment record ID from tenant's paymentRecordIds array
      await tenantModel.findByIdAndUpdate(tenantId, {
        $pull: { paymentRecordIds: paymentRecordId },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting payment record");
    }
  };
  
  const changePaymentStatus = async (tenantId, paymentRecordId, paymentStatus) => {
    try {
      await PaymentRecordModel.findByIdAndUpdate(
        paymentRecordId,
        { paymentStatus },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error changing payment status");
    }
  };
  

module.exports = { createTenant, updateTenant, deleteTenant, getTenants, createPaymentRecordForTenant,  updatePaymentRecord,
    deletePaymentRecord,
    changePaymentStatus, };
