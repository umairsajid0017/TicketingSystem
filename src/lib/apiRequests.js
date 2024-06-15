import { createCategoryEndpoint, getCategoriesEndpoint, createTicketEndpoint, getAllTicketsEndpoint, getSettingsEndpoint, updateCategoryEndpoint, uploadImageEndpoint } from './endpoints'


export const getAllTickets = async (body) => {
    try {
        const res = await fetch(getAllTicketsEndpoint)
        if (!res.ok) {
            throw new Error('Failed to fetch all tickets');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return { "error": true, error_msg: error }
    }
};

export const createTicket = async (body) => {
    try {
        const res = await fetch(createTicketEndpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            throw new Error('Failed to create a ticket');
        }
        return res.json();
    } catch (error) {
        console.error('Error creating a ticket:', error);
        return { "error": true, error_msg: error }
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(getCategoriesEndpoint);
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { "error": true, error_msg: error }
    }
};

export const createCategory = async (body) => {
    try {
        const res = await fetch(createCategoryEndpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            throw new Error('Failed to create category');
        }
        return res.json();
    } catch (error) {
        console.error('Error creating category:', error);
        return { error: true, error_msg: error }
    }
}

export const toggleCategoryStatus = async ( id , body) => {
    console.log(body)
    try {
        const res = await fetch(`${updateCategoryEndpoint}/${id}`,{
            method : 'PUT' , 
            body : JSON.stringify(body)
        })
        if (!res.ok) {
            throw new Error('Failed to update category');
        }
        return res.json();
    } catch (error) {
        console.error('Error updating category:', error);
        return { error: true, error_msg: error }
    }
}

export const getSettings = async () => {
    try {
        const res = await fetch(getSettingsEndpoint)
        if (!res.ok) {
            throw new Error('Failed to fetch settings');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching settings:', error);
        return { error: true, error_msg: error }
    }
}

export const updateSettings = async (body) => {
    try {
        const res = await fetch(getSettingsEndpoint,{
            method : 'PUT' ,
            body : JSON.stringify(body)
        })
        if (!res.ok) {
            throw new Error('Failed to update settings');
        }
        return res.json();
    } catch (error) {
        console.error('Error updating settings:', error);
        return { error: true, error_msg: error }
    }
}

export const uploadImage = async (body) => {
    try {
        const res = await fetch(uploadImageEndpoint , {
            method : 'POST',
            body 
        })
        if (!res.ok) {
            throw new Error('Failed to upload Image');
        }
        return res.json();
    } catch (error) {
        console.error('Error uploading image', error);
        return { error: true, error_msg: error }
    }
}

