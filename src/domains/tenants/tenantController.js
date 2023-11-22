const sendResponse = require("../../utility/response");
// tenantController.js

const tenantService = require("./tenantServices");

const createTenant = async (req, res) => {
    const { name, nationalId, contactNumber, email, address, description, inDate,flatId } = req.body;

    try {
        const newTenant = await tenantService.createTenant({
            name: name,
            description: description,
            nationalId:nationalId,
            contactNumber:contactNumber,
            email:email,
            address:address,
            inDate:inDate,
            flatId:flatId
        });
        // res.status(201).json(newTenant);
        sendResponse(res, 'success', 201, 'Tenant created successfully', newTenant);
    } catch (error) {
        console.error(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
};

const updateTenant = async (req, res) => {
    const id = req.params.id;
    const { name, nationalId, contactNumber, email, address, description, inDate,flatId} = req.body;

    try {
        const updatedTenant = await tenantService.updateTenant(id, {
            name: name,
            description: description,
            nationalId:nationalId,
            contactNumber:contactNumber,
            email:email,
            address:address,
            inDate:inDate,
            flatId:flatId
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

module.exports = { createTenant, updateTenant, deleteTenant, getTenants };
