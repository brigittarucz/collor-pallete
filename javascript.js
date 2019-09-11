let hexcodeEl = document.querySelector(".color-picker");
let hexVal = document.querySelector(".hex-value");
let rgbVal = document.querySelector(".rgb-value");
let hslVal = document.querySelector(".hsl-value");

/* Display on change */

hexcodeEl.addEventListener("input", () => {
    hexcode = hexcodeEl.value;
    hexVal.textContent = hexcode.toUpperCase();
    hexToRGB(hexcode);
    document.querySelector(".base-color").style.backgroundColor = hexcode;
});

/* Display on load */

hexcode = hexcodeEl.value;
hexVal.textContent = hexcode.toUpperCase();
hexToRGB(hexcode);
document.querySelector(".base-color").style.backgroundColor = hexcode

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

    listenHarmony(h, s, l);

}

function listenHarmony(h, s, l) {
    let select = document.querySelector("select");
    select.addEventListener("click", executeHarmony(select, h, s, l))
    select.removeEventListener("click", executeHarmony(select, h, s, l));
}

function executeHarmony(select, h, s, l) {
    let color2 = document.querySelector(".color2");
    let color3 = document.querySelector(".color3");
    let color4 = document.querySelector(".color4");
    let color5 = document.querySelector(".color5");
    if (select.value == "analogous") {
        setAnalogous(h, s, l, color2, color3, color4, color5);
        console.log("I");
    } else if (select.value == "monochromatic") {
        setMonochromatic(h, s, l, color2, color3, color4, color5);
        console.log("II");
    } else if (select.value == "triad") {
        setTriad(h, s, l, color2, color3, color4, color5);
        console.log("III");
    } else if (select.value == "complementary") {
        setComplementary(h, s, l, color2, color3, color4, color5);
        console.log("IV");
    } else if (select.value == "compound") {
        setCompound(h, s, l, color2, color3, color4, color5);
        console.log("V");
    } else if (select.value == "shades") {
        setShades(h, s, l, color2, color3, color4, color5);
        console.log("VI");
    }
};

/* console.log error - the number of color picks is the number of console.logs per change? */

function setAnalogous(hue, saturation, lightning, color2, color3, color4, color5) {

    let hue2 = hue + 10;
    let hue3 = hue - 10;
    color2.style.backgroundColor = `hsl(${hue2}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue3}, ${saturation}%, ${lightning}%`;

    let hue4 = hue + 120;
    let hue5 = hue - 120;
    color4.style.backgroundColor = `hsl(${hue4}, ${saturation}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue5}, ${saturation}%, ${lightning}%`;
}


function setMonochromatic(hue, saturation, lightning, color2, color3, color4, color5) {

    let lightning2 = lightning + 10;
    let lightning3 = lightning - 10;
    let lightning5 = lightning - 20;
    let lightning4 = lightning + 20;

    color2.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning2}%`;
    color3.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning3}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning4}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning5}%`;
}

function setTriad(hue, saturation, lightning, color2, color3, color4, color5) {

    let hue2 = hue + 60;
    let hue3 = hue - 60;

    let lightning4 = lightning + 20;
    let lightning5 = lightning - 20;

    color2.style.backgroundColor = `hsl(${hue2}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue3}, ${saturation}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning4}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightning5}%`;

}

function setComplementary(hue, saturation, lightning, color2, color3, color4, color5) {

    let hue2 = hue + 180;
    let saturation3 = saturation + 40;
    let saturation4 = saturation - 40;
    let saturation5 = saturation - 100;

    color2.style.backgroundColor = `hsl(${hue2}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue}, ${saturation3}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation4}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation5}%, ${lightning}%`;
}

function setCompound(hue, saturation, lightning, color2, color3, color4, color5) {

    let hue2 = hue + 180;
    let hue3 = hue - 40;
    let hue4 = hue + 60;
    let hue5 = hue - 20;

    color2.style.backgroundColor = `hsl(${hue2}, ${saturation}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue3}, ${saturation}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue4}, ${saturation}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue5}, ${saturation}%, ${lightning}%`;

}

function setShades(hue, saturation, lightning, color2, color3, color4, color5) {

    let saturation2 = saturation + 15;
    let saturation3 = saturation - 15;
    let saturation4 = saturation - 30;
    let saturation5 = saturation + 30;

    color2.style.backgroundColor = `hsl(${hue}, ${saturation2}%, ${lightning}%`;
    color3.style.backgroundColor = `hsl(${hue}, ${saturation3}%, ${lightning}%`;
    color4.style.backgroundColor = `hsl(${hue}, ${saturation4}%, ${lightning}%`;
    color5.style.backgroundColor = `hsl(${hue}, ${saturation5}%, ${lightning}%`;
}