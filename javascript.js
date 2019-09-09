let hexcodeEl = document.querySelector(".color-picker");
let hexVal = document.querySelector(".hex-value");
let rgbVal = document.querySelector(".rgb-value");
let hslVal = document.querySelector(".hsl-value");

/* Display on change */

hexcodeEl.addEventListener("input", () => {
    hexcode = hexcodeEl.value;
    hexVal.textContent = hexcode.toUpperCase();
    hexToRGB(hexcode);
    document.querySelector("body").style.backgroundColor = hexcode;
});

/* Display on load */

hexcode = hexcodeEl.value;
hexVal.textContent = hexcode.toUpperCase();
hexToRGB(hexcode);

function hexToRGB(value) {
    let cut2 = value.substring(1, 3);
    let cut4 = value.substring(3, 5);
    let cut6 = value.substring(5, 7);
    let red = parseInt(cut2, 16);
    let green = parseInt(cut4, 16);
    let blue = parseInt(cut6, 16);
    rgbVal.textContent = `(${red}, ${green}, ${blue})`;
    rgbToHSL(red, green, blue);
};

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }

    s *= 100;
    l *= 100;

    h = parseInt(h);
    s = parseInt(s);
    l = parseInt(l);

    hslVal.textContent = `(${h}%,${s}%,${l}%)`;
}