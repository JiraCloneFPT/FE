import Request from '../utils/Request';

export const ExportService = async (data, type) => {
    try {
        const respone = await Request({
            method: "post",
            url: `export/list/${type}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};