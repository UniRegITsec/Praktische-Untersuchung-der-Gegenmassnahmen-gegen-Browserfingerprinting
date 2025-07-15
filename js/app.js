// Hilfsfunktion: Sicherer Zugriff auf DOM-Elemente
function setInnerHTML(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = content;
    } else {
        console.error(`Element mit ID "${id}" nicht gefunden`);
    }
}

// 1. Navigator-Fingerprinting
function fingerprint_navigator() {
    "use strict";
    let strSep = "<br>";
    try {
        // Sammle die Navigator-Eigenschaften
        const plugins = Array.from(navigator.plugins).map(plugin => plugin.name).join(", ") || "Keine Plugins gefunden";
        const hardwareConcurrency = navigator.hardwareConcurrency || "Nicht verfügbar";
        const deviceMemory = navigator.deviceMemory || "Nicht verfügbar";
        const language = navigator.language || "Nicht verfügbar";
        const languages = navigator.languages.join(", ") || "Keine Sprachen gefunden";
        const platform = navigator.platform || "Nicht verfügbar";
        const userAgent = navigator.userAgent || "Nicht verfügbar";
        const appVersion = navigator.appVersion || "Nicht verfügbar";
        const vendor = navigator.vendor || "Nicht verfügbar";
        const productSub = navigator.productSub || "Nicht verfügbar";

        // Baue den Ausgabestring
        let strOut = 
            "navigator.plugins: " + plugins + strSep + strSep +
            "navigator.hardwareConcurrency: " + hardwareConcurrency + strSep + strSep +
            "navigator.deviceMemory: " + deviceMemory + strSep + strSep +
            "navigator.language: " + language + strSep + strSep +
            "navigator.languages: " + languages + strSep + strSep +
            "navigator.platform: " + platform + strSep + strSep +
            "navigator.userAgent: " + userAgent + strSep + strSep +
            "navigator.appVersion: " + appVersion + strSep + strSep +
            "navigator.vendor: " + vendor + strSep + strSep +
            "navigator.productSub: " + productSub + strSep + strSep;

        return strOut;
    } catch (err) {
        return "error";
    }
}

// 2. Intl-Fingerprinting
async function displayIntlFingerprint() {
    async function getIntl() {
        const getLocale = (intl) => {
            const constructors = [
                'Collator',
                'DateTimeFormat',
                'DisplayNames',
                'ListFormat',
                'NumberFormat',
                'PluralRules',
                'RelativeTimeFormat',
            ];
            const locale = constructors.reduce((acc, name) => {
                try {
                    const obj = new intl[name]();
                    if (!obj) return acc;
                    const { locale } = obj.resolvedOptions() || {};
                    return [...acc, locale];
                } catch (error) {
                    return acc;
                }
            }, []);
            return [...new Set(locale)];
        };

        try {
            const locale = getLocale(Intl);
            const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
                month: 'long',
                timeZoneName: 'long',
            }).format(963644400000);
            

            const strOut = 
                "Locale: " + locale.join(', ') + "<br><br>" +
                "DateTimeFormat: " + dateTimeFormat + "<br><br>";

            return strOut;
        } catch (error) {
            return "error: " + error.message;
        }
    }

    return await getIntl();
}

// 3. Screen-Fingerprinting
function fingerprint_screen() {
    "use strict";
    let strSep = "<br>";
    try {
        const screenX = window.screenX || window.screenLeft || "Nicht verfügbar";
        const screenY = window.screenY || window.screenTop || "Nicht verfügbar";
        const width = screen.width || "Nicht verfügbar";
        const height = screen.height || "Nicht verfügbar";
        const availHeight = screen.availHeight || "Nicht verfügbar";
        const availWidth = screen.availWidth || "Nicht verfügbar";
        const availLeft = screen.availLeft || "Nicht verfügbar";
        const availTop = screen.availTop || "Nicht verfügbar";
        const outerWidth = window.outerWidth || "Nicht verfügbar";
        const outerHeight = window.outerHeight || "Nicht verfügbar";
        const isExtended = screen.isExtended || "Nicht verfügbar";
        const colorDepth = screen.colorDepth || "Nicht verfügbar";
        const pixelDepth = screen.pixelDepth || "Nicht verfügbar";
        const devicePixelRatio = window.devicePixelRatio || "Nicht verfügbar";
        const orientation = screen.orientation ? screen.orientation.type : "Nicht verfügbar";
        const innerWidth = window.innerWidth || "Nicht verfügbar";
        const innerHeight = window.innerHeight || "Nicht verfügbar";

        let strOut = 
            "screen.width: " + width + strSep + strSep +
            "screen.height: " + height + strSep + strSep +
            "screen.availHeight: " + availHeight + strSep + strSep +
            "screen.availWidth: " + availWidth + strSep + strSep +
            "screen.availLeft: " + availLeft + strSep + strSep +
            "screen.availTop: " + availTop + strSep + strSep +
            "innerHeight: " + innerHeight + strSep + strSep +
            "innerWidth: " + innerWidth + strSep + strSep +
            "outerWidth: " + outerWidth + strSep + strSep +
            "outerHeight: " + outerHeight + strSep + strSep +
            "screenX: " + screenX + strSep + strSep +
            "screenY: " + screenY + strSep + strSep +
            "screen.isExtended: " + isExtended + strSep + strSep +
            "screen.colorDepth: " + colorDepth + strSep + strSep +
            "screen.pixelDepth: " + pixelDepth + strSep + strSep +
            "window.devicePixelRatio: " + devicePixelRatio + strSep + strSep +
            "screen.orientation: " + orientation;

        return strOut;
    } catch (err) {
        return "error";
    }
}

// 4. Visual Viewport-Fingerprinting
function fingerprint_visualViewport() {
    "use strict";
    let strSep = "<br>";
    try {
        if (!window.visualViewport) {
            throw new Error("VisualViewport wird nicht unterstützt");
        }

        const visualViewport = window.visualViewport;
        const width = visualViewport.width;
        const height = visualViewport.height;
        const scale = visualViewport.scale;

        let strOut = 
            "visualViewport.width: " + width + strSep + strSep +
            "visualViewport.height: " + height + strSep + strSep +
            "visualViewport.scale: " + scale + strSep + strSep;

        return strOut;
    } catch (err) {
        return "error: " + err.message;
    }
}

// 5. Canvas-Fingerprinting
function fingerprint_canvas() {
    "use strict";
    const strOnError = "Error";
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?", 4, 17);
        return canvas.toDataURL();
    } catch (err) {
        return strOnError;
    }
}

// 6. Audio-Fingerprinting
async function displayAudioFingerprint() {
const KnownAudio = {
        "-20.538286209106445": [
            124.0434488439787,
            124.04344968475198,
            124.04347527516074,
            124.04347503720783,
            124.04347657808103,
        ],
        "-20.538288116455078": [
            124.04347518575378,
            124.04347527516074,
            124.04344884395687,
            124.04344968475198,
            124.04347657808103,
            124.04347730590962,
            124.0434765110258,
            124.04347656317987,
            124.04375314689969,
            124.0434485301812,
            124.0434496849557,
            124.043453265891,
            124.04345734833623,
            124.04345808873768,
        ],
        "-20.535268783569336": [
            124.080722568091,
            124.08072256811283,
            124.08072766105033,
            124.08072787802666,
            124.08072787804849,
            124.08074500028306,
            124.0807470110085,
            124.08075528279005,
            124.08075643483608,
        ],
        "-31.502187728881836": [35.74996626004577],
        "-31.502185821533203": [35.74996031448245, 35.7499681673944, 35.749968223273754],
        "-31.50218963623047": [35.74996031448245],
        "-31.509262084960938": [35.7383295930922, 35.73833402246237],
        "-29.837873458862305": [35.10892717540264, 35.10892752557993],
        "-29.83786964416504": [35.10893232002854, 35.10893253237009],
    };



    const bufferLen = 5000;

    function attempt(fn) {
        try {
            return fn();
        } catch (err) {
            return undefined;
        }
    }

    async function getRenderedBuffer(context) {
        const analyser = context.createAnalyser();
        const oscillator = context.createOscillator();
        const dynamicsCompressor = context.createDynamicsCompressor();

        oscillator.type = 'triangle';
        oscillator.frequency.value = 10000;
        dynamicsCompressor.threshold.value = -50;
        dynamicsCompressor.knee.value = 40;
        dynamicsCompressor.attack.value = 0;

        oscillator.connect(dynamicsCompressor);
        dynamicsCompressor.connect(analyser);
        dynamicsCompressor.connect(context.destination);

        oscillator.start(0);
        context.startRendering();

        return new Promise((resolve) => {
            context.oncomplete = (event) => {
                try {
                    dynamicsCompressor.disconnect();
                    oscillator.disconnect();

                    const floatFrequencyData = new Float32Array(analyser.frequencyBinCount);
                    analyser.getFloatFrequencyData(floatFrequencyData);
                    const floatTimeDomainData = new Float32Array(analyser.fftSize);
                    if ('getFloatTimeDomainData' in analyser) {
                        analyser.getFloatTimeDomainData(floatTimeDomainData);
                    }

                    resolve({
                        floatFrequencyData,
                        floatTimeDomainData,
                        buffer: event.renderedBuffer,
                        compressorGainReduction: dynamicsCompressor.reduction.value || dynamicsCompressor.reduction,
                    });
                } catch (error) {
                    resolve(null);
                }
            };
        });
    }

    function getSnapshot(arr, start, end) {
        return arr.slice(start, end);
    }

    function getSum(arr) {
        return arr ? arr.reduce((acc, curr) => acc + Math.abs(curr), 0) : 0;
    }

    let strOut = "";
    try {
        const context = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, bufferLen, 44100);
        if (!context) {
            strOut += "OfflineAudioContext wird nicht unterstützt.<br><br>";
            return strOut;
        }

        const audioData = await getRenderedBuffer(context);
        if (!audioData) {
            strOut += "Audio-Rendering fehlgeschlagen.<br><br>";
            return strOut;
        }

        const { floatFrequencyData, floatTimeDomainData, buffer, compressorGainReduction } = audioData;

        const floatFrequencyDataSum = getSum(floatFrequencyData);
        const floatTimeDomainDataSum = getSum(floatTimeDomainData);

        const channelData = new Float32Array(buffer.length);
        buffer.copyFromChannel(channelData, 0);

        const sampleSum = getSum(getSnapshot(channelData, 4500, bufferLen));

        const knownSums = KnownAudio[compressorGainReduction] || [];
        const matchesKnownAudio = knownSums.includes(sampleSum);

        strOut += "Sum: " + (sampleSum || "N/A") + "<br>";
        strOut += "Gain Reduction: " + (compressorGainReduction || "N/A") + "<br>";
        strOut += "Frequency Data Sum: " + (floatFrequencyDataSum || "N/A") + "<br>";
        strOut += "Time Domain Data Sum: " + (floatTimeDomainDataSum || "N/A") + "<br>";
        strOut += "Matches Known Audio: " + (matchesKnownAudio ? "Yes" : "No") + "<br><br>";
    } catch (error) {
        strOut += "Fehler beim Audio-Fingerprinting: " + error.message + "<br><br>";
    }

    return strOut;
}

// 7. WebGL-Fingerprinting
function WebGLBasics() {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    let reportString = "";

    if (gl) {
        const debugExtension = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugExtension) {
            reportString += "Unmasked Vendor: " + gl.getParameter(debugExtension.UNMASKED_VENDOR_WEBGL) + "<br><br>";
            reportString += "Unmasked Renderer: " + gl.getParameter(debugExtension.UNMASKED_RENDERER_WEBGL) + "<br><br>";
        }

        reportString += "GL Version: " + gl.getParameter(gl.VERSION) + "<br><br>";
        reportString += "Shading Language Version: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION) + "<br><br>";
        reportString += "Vendor: " + gl.getParameter(gl.VENDOR) + "<br><br>";
        reportString += "Renderer: " + gl.getParameter(gl.RENDERER) + "<br><br>";

        const glContextAttributes = gl.getContextAttributes();
        reportString += "Context Attributes:<br>";
        for (const att in glContextAttributes) {
            if (glContextAttributes.hasOwnProperty(att)) {
                reportString += "  " + att + ": " + glContextAttributes[att] + "<br>";
            }
        }
    } else {
        reportString = "WebGL wird nicht unterstützt.";
    }

    return reportString;
}

// 8. WebGL2-Fingerprinting
async function fingerprint_webgl2() {
    async function calculateWebGL2Fingerprint() {
        "use strict";
        try {
            const canvas = document.createElement("canvas");
            canvas.width = 256;
            canvas.height = 128;
            canvas.style.display = "none";
            document.body.appendChild(canvas);

            const gl = canvas.getContext("webgl2");
            if (!gl) {
                throw new Error("WebGL2 wird nicht unterstützt");
            }

            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "Nicht verfügbar";
            const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Nicht verfügbar";
            const version = gl.getParameter(gl.VERSION);
            const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            const maxDrawBuffers = gl.getParameter(gl.MAX_DRAW_BUFFERS);

            let strOut = 
                "WebGL2 Vendor: " + vendor + "<br><br>" +
                "WebGL2 Renderer: " + renderer + "<br><br>" +
                "WebGL2 Version: " + version + "<br><br>" +
                "Max Texture Size: " + maxTextureSize + "<br><br>" +
                "Max Draw Buffers: " + maxDrawBuffers + "<br><br>";

            document.body.removeChild(canvas);
            return strOut;
        } catch (err) {
            return "error: " + err.message;
        }
    }

    return await calculateWebGL2Fingerprint();
}

// 9. Fonts-Fingerprinting
function fingerprint_fonts() {
    "use strict";
    const strOnError = "Error";
    try {
        const style = "position: absolute; visibility: hidden; display: block !important";
        const fonts = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"];
        const count = fonts.length;
        const template = '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',sans-serif !important">ww</b>' + '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',monospace !important">ww</b>';
        const fragment = document.createDocumentFragment();
        const divs = [];
        for (let i = 0; i < count; i++) {
            const font = fonts[i].replace(/['"<>]/g, '');
            const div = document.createElement('div');
            div.innerHTML = template.replace(/X/g, font);
            div.style.cssText = style;
            fragment.appendChild(div);
            divs.push(div);
        }
        document.body.appendChild(fragment);
        const result = [];
        for (let i = 0; i < count; i++) {
            const e = divs[i].getElementsByTagName('b');
            if (e[0].offsetWidth === e[1].offsetWidth) {
                result.push(fonts[i]);
            }
        }
        for (let i = 0; i < count; i++) {
            document.body.removeChild(divs[i]);
        }
        return result.join(' | ');
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_touchSupport() {
    "use strict";
    let strSep = "<br>";
    try {
        const n = navigator;
        let maxTouchPoints = 0;
        let touchEvent;
        if (n.maxTouchPoints !== undefined) {
            maxTouchPoints = parseInt(n.maxTouchPoints, 10); // TypeScript `toInt` wird durch `parseInt` ersetzt
        } else if (n.msMaxTouchPoints !== undefined) {
            maxTouchPoints = n.msMaxTouchPoints;
        }
        try {
            document.createEvent('TouchEvent');
            touchEvent = true;
        } catch {
            touchEvent = false;
        }
        const touchStart = 'ontouchstart' in window;

        // Formatierter String für die Ausgabe
        let strOut = 
            "maxTouchPoints: " + maxTouchPoints + strSep + strSep +
            "touchEvent: " + touchEvent + strSep + strSep +
            "touchStart: " + touchStart + strSep + strSep;

        return strOut;
    } catch (err) {
        return "error: " + err.message;
    }
}

// Hauptfunktion zur Ausführung aller Fingerprinting-Methoden
async function main() {
    const navigatorData = fingerprint_navigator();
    const intlData = await displayIntlFingerprint();
    const screenData = fingerprint_screen();
    const viewportData = fingerprint_visualViewport();
    const canvasData = fingerprint_canvas();
    const audioData = await displayAudioFingerprint();
    const webglData = WebGLBasics();
    const webgl2Data = await fingerprint_webgl2();
    const fontsData = fingerprint_fonts();
	const touchSupportData = fingerprint_touchSupport();
	

    setInnerHTML('navigator', navigatorData);
    setInnerHTML('intl', intlData);
    setInnerHTML('screen', screenData);
    setInnerHTML('viewport', viewportData);
    setInnerHTML('canvas', `<img src="${canvasData}" alt="Canvas Fingerprint">`);
    setInnerHTML('audio', audioData);
    setInnerHTML('webgl', `<pre>${webglData}</pre>`);
    setInnerHTML('webgl2', webgl2Data);
    setInnerHTML('fonts', fontsData);
    setInnerHTML('mobile', touchSupportData);
}

// Starte die Hauptfunktion nach dem Laden des DOM
document.addEventListener('DOMContentLoaded', () => {
    main().catch(error => console.error("Fehler in main:", error));
});
