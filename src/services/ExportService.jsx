import Request from "../utils/Request";

export const ExportFileService = async (data, type) => {
    try {
        const respone = await Request({
            method: "post",
            url: `export/list/${type}`,
            responseType: "blob",
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
