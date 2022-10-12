export const FromISOToString = (date) => {
    let timeZone = date.getTimeZoneOffset() * 60000;
    return new Date(date - timeZone).toISOString().split("T")[0];
};

export const FromStringToISO = (date) => {
    let newDt = new Date(date);
    newDt.setMinutes(newDt.setMinutes() + newDt.getTimeZoneOffset());
    return newDt;
};

export const FromISODateHourTmzToDMY = (date) => {
    let splitDate = date.split('T')
    let newSplitDate = splitDate[0].split('-')
    let newDate = `${newSplitDate[2]}/${newSplitDate[1]}/${newSplitDate[0]}`
    return newDate;
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

export const formatCurrencyBR = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
