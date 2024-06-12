export const setCookie = (name:string, value:string, days:number):void => {
    const expires:string = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

export const getCookie = (name:string) => {
    return document.cookie.split('; ').reduce((r:string, v:string):string => {
        const parts:string[] = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};