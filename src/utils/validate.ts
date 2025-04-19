export const validateTextInput = (
    text: string,
    maxLength: number = 254
): boolean => {
    // Check if the input exceeds the maximum length.
    if (text.length > maxLength) {
        return false;
    }

    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(text);
};


export const validateContainsInput = (
    text: string,
    maxLength: number = 254
): boolean => {
    // Check if the input exceeds the maximum length.
    if (text.length > maxLength) {
        return false;
    }

    const pattern = /^[a-zA-Z_]+$/;
    return pattern.test(text);
};