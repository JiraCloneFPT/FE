import Request from '../utils/Request';
export const ExportHtmlService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "export/list/html",
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
export const ExportExcelService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "export/list/excel",
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
export const ExportWordService = async (id) => {
    try {
        const respone = await Request({
            method: "post",
            url: "export/list/word",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(id),
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};