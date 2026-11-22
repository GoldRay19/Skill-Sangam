export const isBusinessEmail = (email) =>
  !/(gmail|yahoo|outlook|hotmail)\./i.test(email);
export const registrationValid = (type, value) =>
  ({
    CIN: /^[A-Z0-9]{10,24}$/i,
    GSTIN: /^\d{2}[A-Z0-9]{13}$/i,
    Udyam: /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/i,
  })[type]?.test(value) || false;
