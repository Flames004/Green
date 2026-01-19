import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Contact from "../models/contact.model.js";


const addContactInfo = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, subject, message } =  req.body;

    if (!firstname || !lastname || !email || !subject || !message) {
        throw new ApiError(400, "All fields are required");
    }

    const contactInfo = new Contact({
        firstname,
        lastname,
        email,
        subject,
        message
    });

    await contactInfo.save();

    res.status(201).json(new ApiResponse(201, "Contact information submitted successfully", contactInfo));
});

const getAllContacts = asyncHandler(async (req, res) => {

    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(new ApiResponse(200, "Contacts fetched successfully", contacts));
});

export { addContactInfo, getAllContacts };