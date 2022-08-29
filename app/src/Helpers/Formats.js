export const FromISOToString = (date) => {
    let timeZone = date.getTimeZoneOffset() * 60000;
    return new Date(date - timeZone).toISOString().split("T")[0];
};

export const FromStringToISO = (date) => {
    let newDt = new Date(date);
    newDt.setMinutes(newDt.setMinutes() + newDt.getTimeZoneOffset());
    return newDt;
};

export const CleanCPFCNPJ = (value) => {
    return value
        .replaceAll(" ", "")
        .replaceAll(".", "")
        .replaceAll("-", "")
        .replaceAll("/", "");
};

export const EscapedRegExp = (value) => {
    return value.replaceAll(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$g");
};

export const formtCurrencyBR = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};