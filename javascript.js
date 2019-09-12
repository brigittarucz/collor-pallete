"use strict"

let hexcodeEl = document.querySelector(".color-picker");
let hexVal = document.querySelector(".hex-value");
let rgbVal = document.querySelector(".rgb-value");
let hslVal = document.querySelector(".hsl-value");
let select = document.querySelector("select");
let bgCol = document.querySelector("body");
let harmonyActions = {
    "analogous": setAnalogous,
    "monochromatic": setMonochromatic,
    "triad": setTriad,
    "complementary": setComplementary,
    "compound": setCompound,
    "shades": setShades
}

window.onload = createPallete;

hexcodeEl.addEventListener("input", createPallete);

select.addEventListener("click", createPallete);

function createPallete() {
    let hexcode = hexcodeEl.value;
    hexVal.textContent = hexcode.toUpperCase();
    hexToRGB(hexcode);
    document.querySelector(".base-color").style.backgroundColor = hexcode;
}

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

    hslVal.textContent = `(${h},${s}%,${l}%)`;

    executeHarmony(select, h, s, l);
}

function executeHarmony(select, h, s, l) {
    let color2 = document.querySelector(".color2");
    let color3 = document.querySelector(".color3");
    let color4 = document.querySelector(".color4");
    let color5 = document.querySelector(".color5");

    harmonyActions[select.value](h, s, l, color2, color3, color4, color5);
    document.querySelector("body").style.background = `linear-gradient(45deg, ${color2.style.backgroundColor} 0%, ${color3.style.backgroundColor} 30%, ${color4.style.backgroundColor} 72%, ${color5.style.backgroundColor} 82%, ${color5.style.backgroundColor} 100%)`;
};

function setAnalogous(hue, saturation, lightning, color2, color3, color4, color5) {
    color2.style.backgroundColor = `hsl(${hue + 10}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue - 10}, ${saturation}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue + 120}, ${saturation}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue - 120}, ${saturation}%, ${lightning}%`;
}

function setMonochromatic(hue, saturation, lightning, color2, color3, color4, color5) {
    color2.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning + 10}%`;
    color3.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning - 10}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning + 20}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning - 20}%`;
}

function setTriad(hue, saturation, lightning, color2, color3, color4, color5) {
    color2.style.backgroundColor = `hsl(${hue + 60}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue - 60}, ${saturation}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning + 20}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning - 20}%`;

}

function setComplementary(hue, saturation, lightning, color2, color3, color4, color5) {
    color2.style.backgroundColor = `hsl(${hue + 180}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue}, ${saturation + 40}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation - 40}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation - 100}%, ${lightning}%`;
}

function setCompound(hue, saturation, lightning, color2, color3, color4, color5) {
    color2.style.backgroundColor = `hsl(${hue + 180}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue - 40}, ${saturation}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue + 60}, ${saturation}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue - 20}, ${saturation}%, ${lightning}%`;

}

function setShades(hue, saturation, lightning, color2, color3, color4, color5) {
    color2.style.backgroundColor = `hsl(${hue}, ${saturation + 15}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue}, ${saturation - 15}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation - 30}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation + 30}%, ${lightning}%`;
}

/* How can I manage to modify on select input based on this code? */