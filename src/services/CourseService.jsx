import Request from '../utils/Request';
export const GetCoursesService = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "course/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const CreateCourseService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "course/add",
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
export const EditCourseService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "course/edit",
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
export const DeleteCourseService = async (id) => {
    try {
        const respone = await Request({
            method: "delete",
            url: "course/delete",
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