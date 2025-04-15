export const getPxPerRem = () => {
    const body = document.querySelector("body");
    const bodyComputedStyle = body ? getComputedStyle(body) : null;
    return bodyComputedStyle
      ? parseFloat(bodyComputedStyle["font-size"]) || 16
      : 16;
  };
  