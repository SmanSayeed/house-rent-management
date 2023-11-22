// tenantService.js
const tenantModel = require("../tenants/tenant");
const payment = require("./payment");
const PaymentRecordModel = require("./payment")

const createPaymentRecordForTenant = async (tenantId, paymentRecordData) => {
    try {
        
   

      const tenant = await tenantModel.findById(tenantId);

      paymentRecordData.houseRent = tenant.paymentInfo.houseRent;

      paymentRecordData.washaBill = tenant.paymentInfo.washaBill;

      paymentRecordData.cleanerBill = tenant.paymentInfo.cleanerBill;

      paymentRecordData.gasBill = tenant.paymentInfo.gasBill;
      
        console.log({
            tenant: tenantId,
            ...paymentRecordData,
          });
          
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

  const getPayments = async () => {
    try {
        const payments = await PaymentRecordModel.find();
        return payments;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const getTenantPayments = async (tenantId) => {
    try {
      const tenant = await tenantModel.findById(tenantId).populate("paymentRecordIds");
      
      if (!tenant) {
        throw new Error("Tenant not found");
      }
  
      return tenant.paymentRecordIds;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching tenant payments");
    }
  };

  const getPaymentsByMonth = async (tanentId,year, month) => {
    try {
      const startDate = new Date(year, month - 1, 1); // Month is 0-indexed in JavaScript
      const endDate = new Date(year, month, 0);
  
      const payments = await PaymentRecordModel.find({
        tenant: tenantId,
        paymentMonth: {
          $gte: startDate,
          $lte: endDate,
        },
      });
  
      return payments;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching payments by month");
    }
  };
  
module.exports = {          createPaymentRecordForTenant,                         updatePaymentRecord,
    deletePaymentRecord,    
    changePaymentStatus,getPayments,getTenantPayments,
    getPaymentsByMonth };