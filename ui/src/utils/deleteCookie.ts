export const deleteCookie =(name: string) =>{ document.cookie = name +'=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure' }
