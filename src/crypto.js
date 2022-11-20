import CryptoJS from "crypto-js";

const encrypt = (string) => {
  const parsedString = CryptoJS.enc.Utf8.parse(
    CryptoJS.AES.encrypt(JSON.stringify(string), "aers").toString()
  );
  const encryptedString = CryptoJS.enc.Base64.stringify(parsedString);
  return encryptedString;
};

const decrypt = (encryptedString) => {
  const parsedString = CryptoJS.enc.Base64.parse(encryptedString);
  const decodedString = CryptoJS.enc.Utf8.stringify(parsedString).toString();
  return CryptoJS.AES.decrypt(decodedString, "aers")
    .toString(CryptoJS.enc.Utf8)
    .replace(/^"(.+(?="$))"$/, "$1");
};

export { encrypt, decrypt };
