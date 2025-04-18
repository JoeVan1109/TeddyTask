// Regex for code RGB of color's tag

const utils = {
    rgb2Hex(rgbString) {
        const regex = /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/;
        const [, ...results] = rgbString.match(regex);
        const hexValues = results.map(
            value => parseInt(value,10).toString(16).padStart(2, '0').toUpperCase()
        );
        return `#${hexValues[0]}${hexValues[1]}${hexValues[2]}`;
    },
};

export default utils;