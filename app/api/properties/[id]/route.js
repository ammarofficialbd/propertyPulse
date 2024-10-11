import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
    try {
        await connectDB();
        
       // console.log(`Fetching property with ID: ${params.id}`); // For debugging

        const property = await Property.findById(params.id); // Correcting the method
        if (!property) {
            return new Response('Property not found', { status: 404 });
        }
        return new Response(JSON.stringify(property), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching property:', error); // Log the actual error
        return new Response('Something went wrong', { status: 500 });
    }
};
