// const API_BASE_URL = 'https://api.newartx.com/users/v1';
const API_BASE_URL = 'https://stage-api.newartx.com/users/v1';

export const apiFetch = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', payload?: any) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Add body only if the method is POST or PUT
    if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

        if (!response.ok) {
            const data = await response.json();
            console.error('API Error Response:', data); // Log the response data
            throw new Error(data.error || 'API request failed');
        }

        // Return JSON response if the request method is not DELETE
        if (method !== 'DELETE') {
            return await response.json();
        }

    } catch (error) {
        console.error('API Fetch Error:', error);
        throw new Error('OHHhhhhhhhhhhhhh..... Nhi chal rhi.. Hun ki kriye.....');
    }
};
