export const simplifyUrl = (url:string) => {
    return url.replace(/(^\w+:|^)\/\//, '');
}