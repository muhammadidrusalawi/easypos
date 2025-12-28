export const getCookie = (key: string): string | null => {
    const name = `${encodeURIComponent(key)}=`;
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        if (cookie.startsWith(name)) {
            return decodeURIComponent(cookie.substring(name.length));
        }
    }
    return null;
};

export const setCookie = (
    key: string,
    value: string,
    days = 7,
    path = "/",
): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
        value,
    )};expires=${expires.toUTCString()};path=${path};SameSite=Strict;Secure`;
};

export const removeCookie = (key: string, path = "/"): void => {
    document.cookie = `${encodeURIComponent(
        key,
    )}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
};