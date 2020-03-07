const begin = "#d60000";
const end = "#009933";

const componentToHex = (rgb) => {
    let hex  = rgb.toString(16);
    return hex.length === 1 ? "0" + hex: hex;
};

const toHex = (r,g,b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
};

const hexToRGB = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1],16),
        g: parseInt(result[2],16),
        b: parseInt(result[3],16)
    }: null
}

const colourBetween = (factor) => {
    switch(factor) {
        case 0: return begin;
        case 1: return end;
        default: {

        }
    }

    const rgb = getMidRgb(factor);

    return toHex(rgb.r,rgb.g,rgb.b);
};

const getMidRgb = (factor) => {
    const beginRgb = hexToRGB(begin);
    const endRgb = hexToRGB(end);
    return {
        r: Math.ceil(beginRgb.r *(1-factor) + endRgb.r * factor),
        g:  Math.ceil(beginRgb.g *(1-factor) + endRgb.g * factor),
        b: Math.ceil(beginRgb.b *(1-factor) + endRgb.b * factor)
    }
};

const getGradient = () => {

    let linGrad = "linear-gradient(90deg,";

    for(let i =0;  i  < 1; i +=0.1) {
        const mid = getMidRgb(i);
        const midHex = toHex(mid.r,mid.g,mid.b);

            linGrad += (i >= 0.9) ? `${midHex}` : `${midHex},`
    }
    linGrad += ")";

    console.log(linGrad);
    return linGrad;
};

const getTextContrastColor = (hex) => {
     const rgb = hexToRGB(hex);

     return (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186
         ? "#000"
         : "#FFF"
}

export {
    colourBetween,
    getGradient,
    getTextContrastColor
}