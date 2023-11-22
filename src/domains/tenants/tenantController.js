const sendResponse = require("../../utility/response");
// tenantController.js
const multer = require("multer");
const tenantService = require("./tenantServices");




const createTenant = async (req, res) => {
    const { name, nationalId, contactNumber, email, address, description, inDate,outDate,flatId, houseRent, washaBill,cleanerBill, gasBill, extendableCharges } = req.body;

    console.log(req.body,req.file,req.files);

    try {
        const newTenant = await tenantService.createTenant({
            name: name,
            description: description,
            nationalId:nationalId,
            contactNumber:contactNumber,
            email:email,
            address:address,
            inDate:inDate,
            outDate:outDate,
            flatId:flatId,
            houseRent:houseRent,
            washaBill:washaBill,
            cleanerBill:cleanerBill,
            gasBill:gasBill,
            extendableCharges:extendableCharges,
            imageFile:req.file,
            documentFiles:req.files
        });
        sendResponse(res, 'success', 201, 'Tenant created successfully', newTenant);
    } catch (error) {
        console.error(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
};

const updateTenant = async (req, res) => {
    const id = req.params.id;
    const { name, nationalId, contactNumber, email, address, description, inDate,outDate,flatId,houseRent, washaBill,cleanerBill, gasBill, extendableCharges} = req.body;

    try {
        const updatedTenant = await tenantService.updateTenant(id, {
            name: name,
            description: description,
            nationalId:nationalId,
            contactNumber:contactNumber,
            email:email,
            address:address,
            inDate:inDate,
            outDate:outDate,
            flatId:flatId,
            houseRent:houseRent,
            washaBill:washaBill,
            cleanerBill:cleanerBill,
            gasBill:gasBill,
            extendableCharges:extendableCharges
        });
        res.json(updatedTenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteTenant = async (req, res) => {
    const id = req.params.id;

    try {
        const tenant = await tenantService.deleteTenant(id);
        res.status(202).json(tenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getTenants = async (req, res) => {
    try {
        const tenants = await tenantService.getTenants();
        res.status(200).json(tenants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const createPaymentRecordForTenant = async (req, res) => {
    try {
      const { paymentStatus, paymentMonth, paymentDetails } = req.body;
      const paymentRecord = await tenantService.createPaymentRecordForTenant(
        req.params.id,
        {
          paymentStatus,
          paymentMonth,
          paymentDetails,
        }
      );
      res.status(201).json(paymentRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const updatePaymentRecord = async (req, res) => {
    try {
      const { paymentStatus, paymentMonth, paymentDetails } = req.body;
      const updatedPaymentRecord = await tenantService.updatePaymentRecord(
        req.params.tenantId,
        req.params.paymentRecordId,
        {
          paymentStatus,
          paymentMonth,
          paymentDetails,
        }
      );
      res.status(200).json(updatedPaymentRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  const deletePaymentRecord = async (req, res) => {
    try {
      await tenantService.deletePaymentRecord(
        req.params.tenantId,
        req.params.paymentRecordId
      );
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
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
      res.status(200).json({ message: "Payment status changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

module.exports = { createTenant, updateTenant, deleteTenant, getTenants,createPaymentRecordForTenant,  updatePaymentRecord,
    deletePaymentRecord,
    changePaymentStatus, };
