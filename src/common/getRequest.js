export const getRequest = async (url) => {
    try {
        const response = await fetch(url)
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        return responseData
    } catch (e) {
        throw e;
    }
}
