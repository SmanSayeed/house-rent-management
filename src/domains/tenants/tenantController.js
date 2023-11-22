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
      
        sendResponse(res, 'success', 201, 'Tenant updated successfully', updatedTenant);
    } catch (error) {
        console.error(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
};

const deleteTenant = async (req, res) => {
    const id = req.params.id;

    try {
        const tenant = await tenantService.deleteTenant(id);
        sendResponse(res, 'success', 202, 'Tenant delete successfully', tenant);
    } catch (error) {
        console.error(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
};

const getTenants = async (req, res) => {
    try {
        const tenants = await tenantService.getTenants();
        // res.status(200).json(tenants);
        sendResponse(res, 'success', 200, 'Tenants found', tenants);
    } catch (error) {
        console.error(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
};


module.exports = { createTenant, updateTenant, deleteTenant, getTenants };
