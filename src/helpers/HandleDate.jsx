export const HanldeDate = (date) => {
    const milliseconds = new Date() - new Date(date);
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const result = days === 1 ? `Yesterday` : days > 1 ? `${days} days ago`
        : hours > 0 ? `${hours} hours ago` : minutes > 0 ? `${minutes} minutes ago` : `Just Now`;
    return result;
}
export const HanldeDateActivity = (date) =>{
    const _date = new Date(date);
    return _date.toDateString();
}