const sendResponse = require("../../utility/response");
// tenantController.js
const paymentService = require("./paymentServices");




const createPaymentRecordForTenant = async (req, res) => {
    try {
      const { tenant,paymentStatus, paymentMonth,houseRent,
        gasBill,
        washaBill,
        cleanerBill,
        extendableCharges } = req.body;
      const paymentRecord = await paymentService.createPaymentRecordForTenant(
       tenant,
        {
          paymentStatus,
          paymentMonth,
          houseRent,
          gasBill,
          washaBill,
          cleanerBill,
          extendableCharges
        }
      );
    //   res.status(201).json(paymentRecord);
      sendResponse(res, 'success', 201, 'Payment record created successfully', paymentRecord);
    } catch (error) {
      console.error(error);
      sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
  };

  const updatePaymentRecord = async (req, res) => {
    try {
      const { paymentStatus, paymentMonth,   houseRent,
        gasBill,
        washaBill,
        cleanerBill,
        extendableCharges } = req.body;
      const updatedPaymentRecord = await paymentService.updatePaymentRecord(
        req.params.tenantId,
        req.params.paymentRecordId,
        {
          paymentStatus,
          paymentMonth,
          houseRent,
          gasBill,
          washaBill,
          cleanerBill,
          extendableCharges
        }
      );
    //   res.status(200).json(updatedPaymentRecord);
    sendResponse(res, 'success', 200, 'Payment status changed successfully', updatedPaymentRecord);
    } catch (error) {
      console.error(error);
      sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
  };
  
  const deletePaymentRecord = async (req, res) => {
    try {
      await paymentService.deletePaymentRecord(
        req.params.tenantId,
        req.params.paymentRecordId
      );
    //   res.status(204).end();
      sendResponse(res, 'success', 204, 'Payment record deleted successfully');
    } catch (error) {
      console.error(error);
      sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
  };
  
  const changePaymentStatus = async (req, res) => {
    try {
      const { paymentStatus } = req.body;
      await tenantService.changePaymentStatus(
        req.params.tenantId,
        req.params.paymentRecordId,
        paymentStatus
      );
    //   res.status(200).json({ message: "Payment status changed successfully" });
    sendResponse(res, 'success', 200, 'Payment status changed successfully');
    } catch (error) {
      console.error(error);
      sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
  };


  const getPayments = async (req, res) => {
    try {
        const payments = await paymentService.getPayments();
        // res.status(200).json(tenants);
        sendResponse(res, 'success', 200, 'Payments found', payments);
    } catch (error) {
        console.error(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
};

const getTenantPayments = async (req, res) => {
    const tenantId = request.params.tenantId
    try {
        const payments = await paymentService.getTenantPayments(tenantId);
        // res.status(200).json(tenants);
        sendResponse(res, 'success', 200, 'Payments found', payments);
    } catch (error) {
        console.error(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
};

const getPaymentsByMonth = async (req, res) => {
    try {
      const { tanentId, year, month } = req.params;
      const payments = await paymentService.getPaymentsByMonth(tanentId,year, month);
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };


  module.exports = {
    createPaymentRecordForTenant,  
    updatePaymentRecord,
    deletePaymentRecord,
    changePaymentStatus,
    getPayments,
    getTenantPayments,
    getPaymentsByMonth 
};