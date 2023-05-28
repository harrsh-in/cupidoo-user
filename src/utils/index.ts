export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const verifyPinCode = (pinCode: string) => {
    const pinCodeRegex = new RegExp(/^[1-9]{1}\d{2}\s?\d{3}$/g);
    return pinCodeRegex.test(pinCode);
};
