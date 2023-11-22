// tenantService.js
const tenantModel = require("./tenant");

const createTenant = async ({ name, nationalId, contactNumber, email, address, description, inDate,flatId }) => {
    const newTenant = new tenantModel({
        name: name,
        description: description,
        nationalId:nationalId,
        contactNumber:contactNumber,
        email:email,
        address:address,
        inDate:inDate,
        flatId:flatId
    });

    try {
        await newTenant.save();
        return newTenant;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const updateTenant = async (id, {  name, nationalId, contactNumber, email, address, description, inDate,flatId }) => {
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

module.exports = { createTenant, updateTenant, deleteTenant, getTenants };
