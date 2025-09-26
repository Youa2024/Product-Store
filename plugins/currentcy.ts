export default defineNuxtPlugin(() => {
  const formatCurrency = (value: string | number): string => {
    if (value == null) return "";

    // convert to string
    let strValue = String(value).replace(/[^\d.]/g, "");

    if (!strValue) return "";

    const [intPart, decimalPart] = strValue.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart
      ? `${withCommas}.${decimalPart.slice(0, 2)}`
      : withCommas;
  };

  return {
    provide: {
      formatCurrency,
    },
  };
});
