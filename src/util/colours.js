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
        case 0: return "#d60000";
        case 1: return "#19a800";
    }
    const c1 = hexToRGB("#d60000");
    const c2 = hexToRGB("#19a800");



    const r = Math.ceil(c1.r *(1-factor) + c2.r * factor);
    const g = Math.ceil(c1.g *(1-factor) + c2.g * factor);
    const b = Math.ceil(c1.b *(1-factor) + c2.b * factor);


    return toHex(r, g, b);
}

export {
    colourBetween
}