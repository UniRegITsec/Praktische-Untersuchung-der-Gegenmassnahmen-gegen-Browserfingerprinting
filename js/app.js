// Hilfsfunktion: Sicherer Zugriff auf DOM-Elemente
// Diese Funktion ermöglicht das Setzen des innerHTML-Inhalts eines DOM-Elements anhand seiner ID.
// Sie prüft, ob das Element existiert, und gibt eine Fehlermeldung in der Konsole aus, falls es nicht gefunden wird.
function setInnerHTML(id, content) {
    const element = document.getElementById(id); // Sucht im DOM nach einem Element mit der angegebenen ID
    if (element) { // Prüft, ob das Element gefunden wurde
        element.innerHTML = content; // Setzt den HTML-Inhalt des Elements auf den übergebenen Wert
    } else { // Falls das Element nicht existiert
        console.error(`Element mit ID "${id}" nicht gefunden`); // Gibt eine Fehlermeldung in der Konsole aus
    }
}

// 1. Navigator-Fingerprinting
// Diese Funktion sammelt Informationen über die Navigator-Eigenschaften des Browsers, um einen Fingerabdruck des Geräts zu erstellen.
// Sie gibt die gesammelten Daten als formatierten String zurück.
function fingerprint_navigator() {
    "use strict"; // Aktiviert den strikten Modus, um potenziell unsicheren Code zu vermeiden
    let strSep = "<br>"; // Definiert ein Trennzeichen (HTML-Zeilenumbruch) für die Ausgabe
    try { // Fehlerbehandlung für den gesamten Code-Block
        // Sammle die Navigator-Eigenschaften
        const plugins = Array.from(navigator.plugins).map(plugin => plugin.name).join(", ") || "Keine Plugins gefunden"; // Liste der installierten Plugins als kommaseparierter String
        const hardwareConcurrency = navigator.hardwareConcurrency || "Nicht verfügbar"; // Anzahl der logischen Prozessorkerne
        const deviceMemory = navigator.deviceMemory || "Nicht verfügbar"; // Speichergröße des Geräts in GB
        const language = navigator.language || "Nicht verfügbar"; // Bevorzugte Sprache des Benutzers
        const languages = navigator.languages.join(", ") || "Keine Sprachen gefunden"; // Liste aller bevorzugten Sprachen
        const platform = navigator.platform || "Nicht verfügbar"; // Plattform, auf der der Browser läuft (z.B. Win32)
        const userAgent = navigator.userAgent || "Nicht verfügbar"; // User-Agent-String des Browsers
        const appVersion = navigator.appVersion || "Nicht verfügbar"; // Versionsinformationen des Browsers
        const vendor = navigator.vendor || "Nicht verfügbar"; // Anbieter des Browsers (z.B. Google Inc.)
        const productSub = navigator.productSub || "Nicht verfügbar"; // Build-Nummer des Browsers

        // Baue den Ausgabestring mit allen gesammelten Informationen
        let strOut = 
            "navigator.plugins: " + plugins + strSep + strSep + // Plugins mit doppeltem Zeilenumbruch
            "navigator.hardwareConcurrency: " + hardwareConcurrency + strSep + strSep + // Prozessorkerne
            "navigator.deviceMemory: " + deviceMemory + strSep + strSep + // Gerätespeicher
            "navigator.language: " + language + strSep + strSep + // Sprache
            "navigator.languages: " + languages + strSep + strSep + // Sprachenliste
            "navigator.platform: " + platform + strSep + strSep + // Plattform
            "navigator.userAgent: " + userAgent + strSep + strSep + // User-Agent
            "navigator.appVersion: " + appVersion + strSep + strSep + // Version
            "navigator.vendor: " + vendor + strSep + strSep + // Anbieter
            "navigator.productSub: " + productSub + strSep + strSep; // Build-Nummer

        return strOut; // Gibt den formatierten String zurück
    } catch (err) { // Falls ein Fehler auftritt
        return "error"; // Gibt eine einfache Fehlermeldung zurück
    }
}

// 2. Intl-Fingerprinting
// Diese asynchrone Funktion sammelt Informationen über die Internationalisierungs-Einstellungen (Intl) des Benutzers.
// Sie verwendet verschachtelte Funktionen, um die Daten zu extrahieren und zurückzugeben.
async function displayIntlFingerprint() {
    // Innere Hilfsfunktion, die die eigentliche Arbeit erledigt
    async function getIntl() {
        // Hilfsfunktion zum Abrufen der Locale-Informationen aus verschiedenen Intl-Konstruktoren
        const getLocale = (intl) => {
            const constructors = [ // Liste der Intl-Konstruktoren, die geprüft werden
                'Collator', // Für Zeichenvergleiche
                'DateTimeFormat', // Für Datums- und Zeitformatierung
                'DisplayNames', // Für benutzerfreundliche Namen
                'ListFormat', // Für Listenformatierung
                'NumberFormat', // Für Zahlenformatierung
                'PluralRules', // Für Pluralisierungsregeln
                'RelativeTimeFormat', // Für relative Zeitangaben
            ];
            const locale = constructors.reduce((acc, name) => { // Iteriert über die Konstruktoren
                try { // Fehlerbehandlung für jeden Konstruktor
                    const obj = new intl[name](); // Erstellt eine neue Instanz des Konstruktors
                    if (!obj) return acc; // Falls das Objekt nicht erstellt werden kann, wird der Akkumulator unverändert zurückgegeben
                    const { locale } = obj.resolvedOptions() || {}; // Extrahiert die Locale-Eigenschaft
                    return [...acc, locale]; // Fügt die Locale zum AkkumFLASHator hinzu
                } catch (error) { // Falls ein Fehler auftritt
                    return acc; // Ignoriert den Fehler und gibt den bisherigen Akkumulator zurück
                }
            }, []); // Startwert ist ein leeres Array
            return [...new Set(locale)]; // Entfernt Duplikate und gibt einzigartige Locale-Werte zurück
        };

        try { // Fehlerbehandlung für die Hauptlogik
            const locale = getLocale(Intl); // Ruft die Locale-Informationen ab
            const dateTimeFormat = new Intl.DateTimeFormat(undefined, { // Erstellt ein Datumsformatierungsobjekt
                month: 'long', // Monat als langer Text (z.B. "Juli")
                timeZoneName: 'long', // Zeitzonenname als langer Text (z.B. "Mitteleuropäische Zeit")
            }).format(963644400000); // Formatiert den Timestamp 963644400000 (entspricht 16. Juli 2000)

            // Baue den Ausgabestring
            const strOut = 
                "Locale: " + locale.join(', ') + "<br><br>" + // Liste der Locales, durch Kommas getrennt
                "DateTimeFormat: " + dateTimeFormat + "<br><br>"; // Formatiertes Datum mit Zeitzone

            return strOut; // Gibt den formatierten String zurück
        } catch (error) { // Falls ein Fehler auftritt
            return "error: " + error.message; // Gibt eine Fehlermeldung mit Details zurück
        }
    }

    return await getIntl(); // Ruft die innere Funktion auf und gibt deren Ergebnis zurück
}

// 3. Screen-Fingerprinting
// Diese Funktion sammelt Informationen über die Bildschirm- undmeß Eigenschaften des Geräts und des Browserfensters.
// Sie gibt die Daten als formatierten String zurück.
function fingerprint_screen() {
    "use strict"; // Aktiviert den strikten Modus
    let strSep = "<br>"; // Trennzeichen für die Ausgabe
    try { // Fehlerbehandlung für den gesamten Code-Block
        const screenX = window.screenX || window.screenLeft || "Nicht verfügbar"; // X-Position des Fensters auf dem Bildschirm
        const screenY = window.screenY || window.screenTop || "Nicht verfügbar"; // Y-Position des Fensters auf dem Bildschirm
        const width = screen.width || "Nicht verfügbar"; // Gesamtbreite des Bildschirms
        const height = screen.height || "Nicht verfügbar"; // Gesamthöhe des Bildschirms
        const availHeight = screen.availHeight || "Nicht verfügbar"; // Verfügbare Höhe des Bildschirms (ohne Taskleiste usw.)
        const availWidth = screen.availWidth || "Nicht verfügbar"; // Verfügbare Breite des Bildschirms
        const availLeft = screen.availLeft || "Nicht verfügbar"; // Linker Rand des verfügbaren Bereichs
        const availTop = screen.availTop || "Nicht verfügbar"; // Oberer Rand des verfügbaren Bereichs
        const outerWidth = window.outerWidth || "Nicht verfügbar"; // Äußere Breite des Browserfensters
        const outerHeight = window.outerHeight || "Nicht verfügbar"; // Äußere Höhe des Browserfensters
        const isExtended = screen.isExtended || "Nicht verfügbar"; // Ob der Bildschirm erweitert ist (z.B. Multi-Monitor)
        const colorDepth = screen.colorDepth || "Nicht verfügbar"; // Farbtiefe des Bildschirms in Bits
        const pixelDepth = screen.pixelDepth || "Nicht verfügbar"; // Pixeltiefe des Bildschirms in Bits
        const devicePixelRatio = window.devicePixelRatio || "Nicht verfügbar"; // Verhältnis von physischen zu CSS-Pixeln
        const orientation = screen.orientation ? screen.orientation.type : "Nicht verfügbar"; // Ausrichtung des Bildschirms (z.B. landscape-primary)
        const innerWidth = window.innerWidth || "Nicht verfügbar"; // Innere Breite des Browserfensters
        const innerHeight = window.innerHeight || "Nicht verfügbar"; // Innere Höhe des Browserfensters

        // Baue den Ausgabestring
        let strOut = 
            "screen.width: " + width + strSep + strSep + // Bildschirmbreite
            "screen.height: " + height + strSep + strSep + // Bildschirmhöhe
            "screen.availHeight: " + availHeight + strSep + strSep + // Verfügbare Höhe
            "screen.availWidth: " + availWidth + strSep + strSep + // Verfügbare Breite
            "screen.availLeft: " + availLeft + strSep + strSep + // Verfügbarer linker Rand
            "screen.availTop: " + availTop + strSep + strSep + // Verfügbarer oberer Rand
            "innerHeight: " + innerHeight + strSep + strSep + // Innere Fensterhöhe
            "innerWidth: " + innerWidth + strSep + strSep + // Innere Fensterbreite
            "outerWidth: " + outerWidth + strSep + strSep + // Äußere Fensterbreite
            "outerHeight: " + outerHeight + strSep + strSep + // Äußere Fensterhöhe
            "screenX: " + screenX + strSep + strSep + // X-Position
            "screenY: " + screenY + strSep + strSep + // Y-Position
            "screen.isExtended: " + isExtended + strSep + strSep + // Erweiterter Bildschirm
            "screen.colorDepth: " + colorDepth + strSep + strSep + // Farbtiefe
            "screen.pixelDepth: " + pixelDepth + strSep + strSep + // Pixeltiefe
            "window.devicePixelRatio: " + devicePixelRatio + strSep + strSep + // Pixel-Verhältnis
            "screen.orientation: " + orientation; // Bildschirmausrichtung

        return strOut; // Gibt den formatierten String zurück
    } catch (err) { // Falls ein Fehler auftritt
        return "error"; // Gibt eine einfache Fehlermeldung zurück
    }
}

// 4. Visual Viewport-Fingerprinting
// Diese Funktion sammelt Informationen über den sichtbaren Bereich des Browserfensters (Visual Viewport).
// Sie gibt die Daten als formatierten String zurück.
function fingerprint_visualViewport() {
    "use strict"; // Aktiviert den strikten Modus
    let strSep = "<br>"; // Trennzeichen für die Ausgabe
    try { // Fehlerbehandlung für den gesamten Code-Block
        if (!window.visualViewport) { // Prüft, ob VisualViewport unterstützt wird
            throw new Error("VisualViewport wird nicht unterstützt"); // Wirft einen Fehler, falls nicht unterstützt
        }

        const visualViewport = window.visualViewport; // Ruft das VisualViewport-Objekt ab
        const width = visualViewport.width; // Breite des sichtbaren Bereichs
        const height = visualViewport.height; // Höhe des sichtbaren Bereichs
        const scale = visualViewport.scale; // Zoom-Faktor des Viewports

        // Baue den Ausgabestring
        let strOut = 
            "visualViewport.width: " + width + strSep + strSep + // Viewport-Breite
            "visualViewport.height: " + height + strSep + strSep + // Viewport-Höhe
            "visualViewport.scale: " + scale + strSep + strSep; // Zoom-Faktor

        return strOut; // Gibt den formatierten String zurück
    } catch (err) { // Falls ein Fehler auftritt
        return "error: " + err.message; // Gibt eine Fehlermeldung mit Details zurück
    }
}

// 5. Canvas-Fingerprinting
// Diese Funktion erstellt eine eindeutige Signatur basierend auf der Canvas-Rendering-Fähigkeit des Geräts.
// Sie gibt eine Data-URL zurück, die als Fingerabdruck dient.
function fingerprint_canvas() {
    "use strict"; // Aktiviert den strikten Modus
    var strOnError, canvas, strCText, strText, strOut; // Deklariert Variablen für Fehler, Canvas, Kontext, Text und Ausgabe

    strOnError = "Error"; // Standard-Fehlermeldung
    canvas = null; // Initialisiert Canvas-Variable
    strCText = null; // Initialisiert Kontext-Variable
    strText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?"; // Test-String für das Rendering
    strOut = null; // Initialisiert Ausgabe-Variable

    try { // Fehlerbehandlung für den gesamten Code-Block
        canvas = document.createElement('canvas'); // Erstellt ein neues Canvas-Element im Speicher
        strCText = canvas.getContext('2d'); // Ruft den 2D-Rendering-Kontext des Canvas ab
        strCText.textBaseline = "top"; // Setzt die Text-Basislinie auf "top"
        strCText.font = "14px 'Arial'"; // Setzt die Schriftart auf 14px Arial
        strCText.textBaseline = "alphabetic"; // Ändert die Text-Basislinie auf "alphabetic"
        strCText.fillStyle = "#f60"; // Setzt die Füllfarbe auf Orange (#f60)
        strCText.fillRect(125, 1, 62, 20); // Zeichnet ein gefülltes Rechteck an Position (125, 1) mit Breite 62 und Höhe 20
        strCText.fillStyle = "#069"; // Ändert die Füllfarbe auf Blau (#069)
        strCText.fillText(strText, 2, 15); // Zeichnet den Test-Text an Position (2, 15)
        strCText.fillStyle = "rgba(102, 204, 0, 0.7)"; // Ändert die Füllfarbe auf halbtransparentes Grün
        strCText.fillText(strText, 4, 17); // Zeichnet den Test-Text erneut mit leichtem Versatz an Position (4, 17)
        strOut = canvas.toDataURL(); // Konvertiert das Canvas in eine Data-URL (Base64-kodiertes Bild)
        return strOut; // Gibt die Data-URL als Fingerabdruck zurück
    } catch (err) { // Falls ein Fehler auftritt
        return strOnError; // Gibt die Fehlermeldung "Error" zurück
    }
}

// 6. Audio-Fingerprinting
// Diese asynchrone Funktion erstellt einen Fingerabdruck basierend auf den Audio-Rendering-Fähigkeiten des Geräts.
// Sie gibt die Analyseergebnisse als formatierten String zurück.
async function displayAudioFingerprint() {
    // Bekannte Audio-Summen für bestimmte Gain-Reduktionswerte
    // Dieses Objekt enthält vordefinierte Werte, die mit den berechneten Summen verglichen werden
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

    const bufferLen = 5000; // Länge des Audiopuffers in Samples

    // Hilfsfunktion, um Fehler bei der Ausführung einer Funktion abzufangen
    function attempt(fn) {
        try { // Versucht, die übergebene Funktion auszuführen
            return fn(); // Gibt das Ergebnis zurück
        } catch (err) { // Falls ein Fehler auftritt
            return undefined; // Gibt undefined zurück
        }
    }

    // Asynchrone Hilfsfunktion zum Rendern eines Audiobuffers
    async function getRenderedBuffer(context) {
        const analyser = context.createAnalyser(); // Erstellt einen Analyser-Knoten zur Datenanalyse
        const oscillator = context.createOscillator(); // Erstellt einen Oszillator zur Tonerzeugung
        const dynamicsCompressor = context.createDynamicsCompressor(); // Erstellt einen Kompressor zur Audioverarbeitung

        oscillator.type = 'triangle'; // Setzt den Oszillator auf eine Dreieckswelle
        oscillator.frequency.value = 10000; // Setzt die Frequenz auf 10 kHz
        dynamicsCompressor.threshold.value = -50; // Setzt den Schwellenwert des Kompressors
        dynamicsCompressor.knee.value = 40; // Setzt den Knee-Wert des Kompressors
        dynamicsCompressor.attack.value = 0; // Setzt die Attack-Zeit des Kompressors auf 0

        // Verbindet die Audio-Knoten in einer Kette
        oscillator.connect(dynamicsCompressor); // Oszillator an Kompressor
        dynamicsCompressor.connect(analyser); // Kompressor an Analyser
        dynamicsCompressor.connect(context.destination); // Kompressor an Audio-Ausgabe

        oscillator.start(0); // Startet den Oszillator bei Zeitpunkt 0
        context.startRendering(); // Startet das Rendering des Audio-Kontexts

        // Promise, das die gerenderten Audiodaten zurückgibt
        return new Promise((resolve) => {
            context.oncomplete = (event) => { // Wird aufgerufen, wenn das Rendering abgeschlossen ist
                try { // Fehlerbehandlung für die Datenextraktion
                    dynamicsCompressor.disconnect(); // Trennt den Kompressor
                    oscillator.disconnect(); // Trennt den Oszillator

                    // Extrahiert Frequenzdaten
                    const floatFrequencyData = new Float32Array(analyser.frequencyBinCount); // Array für Frequenzdaten
                    analyser.getFloatFrequencyData(floatFrequencyData); // Füllt das Array mit Frequenzdaten
                    const floatTimeDomainData = new Float32Array(analyser.fftSize); // Array für Zeitbereichsdaten
                    if ('getFloatTimeDomainData' in analyser) { // Prüft, ob die Methode verfügbar ist
                        analyser.getFloatTimeDomainData(floatTimeDomainData); // Füllt das Array mit Zeitbereichsdaten
                    }

                    // Gibt die extrahierten Daten zurück
                    resolve({
                        floatFrequencyData, // Frequenzdaten
                        floatTimeDomainData, // Zeitbereichsdaten
                        buffer: event.renderedBuffer, // Gerenderter Audiopuffer
                        compressorGainReduction: dynamicsCompressor.reduction.value || dynamicsCompressor.reduction, // Gain-Reduktion des Kompressors
                    });
                } catch (error) { // Falls ein Fehler auftritt
                    resolve(null); // Gibt null zurück
                }
            };
        });
    }

    // Hilfsfunktion zum Extrahieren eines Ausschnitts aus einem Array
    function getSnapshot(arr, start, end) {
        return arr.slice(start, end); // Gibt einen Teil des Arrays von start bis end zurück
    }

    // Hilfsfunktion zur Berechnung der Summe der absoluten Werte eines Arrays
    function getSum(arr) {
        return arr ? arr.reduce((acc, curr) => acc + Math.abs(curr), 0) : 0; // Summiert die absoluten Werte, falls das Array existiert
    }

    let strOut = ""; // Initialisiert den Ausgabe-String
    try { // Fehlerbehandlung für die Hauptlogik
        // Initialisiert einen OfflineAudioContext mit 1 Kanal, bufferLen Samples und 44100 Hz Abtastrate
        const context = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, bufferLen, 44100);
        if (!context) { // Prüft, ob der Kontext erstellt wurde
            strOut += "OfflineAudioContext wird nicht unterstützt.<br><br>"; // Fehlermeldung, falls nicht unterstützt
            return strOut; // Gibt den String zurück
        }

        const audioData = await getRenderedBuffer(context); // Rendert den Audiobuffer und wartet auf das Ergebnis
        if (!audioData) { // Prüft, ob Daten zurückgegeben wurden
            strOut += "Audio-Rendering fehlgeschlagen.<br><br>"; // Fehlermeldung bei Misserfolg
            return strOut; // Gibt den String zurück
        }

        // Entpackt die Audiodaten aus dem Ergebnis
        const { floatFrequencyData, floatTimeDomainData, buffer, compressorGainReduction } = audioData;

        const floatFrequencyDataSum = getSum(floatFrequencyData); // Berechnet die Summe der Frequenzdaten
        const floatTimeDomainDataSum = getSum(floatTimeDomainData); // Berechnet die Summe der Zeitbereichsdaten

        const channelData = new Float32Array(buffer.length); // Erstellt ein Array für die Kanal-Daten
        buffer.copyFromChannel(channelData, 0); // Kopiert die Daten des ersten Kanals in das Array

        const sampleSum = getSum(getSnapshot(channelData, 4500, bufferLen)); // Berechnet die Summe eines Ausschnitts der Audiodaten

        const knownSums = KnownAudio[compressorGainReduction] || []; // Ruft bekannte Summen für die Gain-Reduktion ab
        const matchesKnownAudio = knownSums.includes(sampleSum); // Prüft, ob die berechnete Summe bekannt ist

        // Baue den Ausgabestring
        strOut += "Sum: " + (sampleSum || "N/A") + "<br>"; // Summe des Ausschnitts
        strOut += "Gain Reduction: " + (compressorGainReduction || "N/A") + "<br>"; // Gain-Reduktion
        strOut += "Frequency Data Sum: " + (floatFrequencyDataSum || "N/A") + "<br>"; // Summe der Frequenzdaten
        strOut += "Time Domain Data Sum: " + (floatTimeDomainDataSum || "N/A") + "<br>"; // Summe der Zeitbereichsdaten
        strOut += "Matches Known Audio: " + (matchesKnownAudio ? "Yes" : "No") + "<br><br>"; // Übereinstimmung mit bekannten Werten
    } catch (error) { // Falls ein Fehler auftritt
        strOut += "Fehler beim Audio-Fingerprinting: " + error.message + "<br><br>"; // Fügt die Fehlermeldung hinzu
    }

    return strOut; // Gibt den formatierten String zurück
}

// 7. WebGL-Fingerprinting
// Diese Funktion sammelt grundlegende Informationen über die WebGL-Fähigkeiten des Geräts.
// Sie gibt die Daten als formatierten String zurück.
function WebGLBasics() {
    const c = document.createElement('canvas'); // Erstellt ein neues Canvas-Element im Speicher
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl'); // Ruft den WebGL-Kontext ab, mit Fallback auf experimentelle Version
    let reportString = ""; // Initialisiert den Ausgabe-String

    if (gl) { // Prüft, ob WebGL unterstützt wird
        const debugExtension = gl.getExtension('WEBGL_debug_renderer_info'); // Ruft die Debug-Erweiterung ab, falls verfügbar
        if (debugExtension) { // Falls die Debug-Erweiterung verfügbar ist
            reportString += "Unmasked Vendor: " + gl.getParameter(debugExtension.UNMASKED_VENDOR_WEBGL) + "<br><br>"; // Unmaskierter Hersteller
            reportString += "Unmasked Renderer: " + gl.getParameter(debugExtension.UNMASKED_RENDERER_WEBGL) + "<br><br>"; // Unmaskierter Renderer
        }

        reportString += "GL Version: " + gl.getParameter(gl.VERSION) + "<br><br>"; // WebGL-Version
        reportString += "Shading Language Version: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION) + "<br><br>"; // Shader-Sprachversion
        reportString += "Vendor: " + gl.getParameter(gl.VENDOR) + "<br><br>"; // Hersteller
        reportString += "Renderer: " + gl.getParameter(gl.RENDERER) + "<br><br>"; // Renderer

        const glContextAttributes = gl.getContextAttributes(); // Ruft die Kontextattribute ab
        reportString += "Context Attributes:<br>"; // Fügt eine Überschrift für die Attribute hinzu
        for (const att in glContextAttributes) { // Iteriert über die Attribute
            if (glContextAttributes.hasOwnProperty(att)) { // Prüft, ob das Attribut eine eigene Eigenschaft ist
                reportString += "  " + att + ": " + glContextAttributes[att] + "<br>"; // Fügt jedes Attribut mit Wert hinzu
            }
        }
    } else { // Falls WebGL nicht unterstützt wird
        reportString = "WebGL wird nicht unterstützt."; // Setzt eine Fehlermeldung
    }

    return reportString; // Gibt den formatierten String zurück
}

// 8. WebGL2-Fingerprinting
// Diese asynchrone Funktion sammelt Informationen über die WebGL2-Fähigkeiten des Geräts.
// Sie gibt die Daten als formatierten String zurück.
async function fingerprint_webgl2() {
    // Innere asynchrone Funktion zur Berechnung des Fingerabdrucks
    async function calculateWebGL2Fingerprint() {
        "use strict"; // Aktiviert den strikten Modus
        try { // Fehlerbehandlung für den gesamten Code-Block
            const canvas = document.createElement("canvas"); // Erstellt ein neues Canvas-Element
            canvas.width = 256; // Setzt die Breite auf 256 Pixel
            canvas.height = 128; // Setzt die Höhe auf 128 Pixel
            canvas.style.display = "none"; // Verbirgt das Canvas im DOM
            document.body.appendChild(canvas); // Fügt das Canvas temporär zum DOM hinzu

            const gl = canvas.getContext("webgl2"); // Ruft den WebGL2-Kontext ab
            if (!gl) { // Prüft, ob WebGL2 unterstützt wird
                throw new Error("WebGL2 wird nicht unterstützt"); // Wirft einen Fehler, falls nicht unterstützt
            }

            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info"); // Ruft die Debug-Erweiterung ab
            const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "Nicht verfügbar"; // Unmaskierter Hersteller, falls verfügbar
            const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Nicht verfügbar"; // Unmaskierter Renderer, falls verfügbar
            const version = gl.getParameter(gl.VERSION); // WebGL2-Version
            const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE); // Maximale Texturgröße
            const maxDrawBuffers = gl.getParameter(gl.MAX_DRAW_BUFFERS); // Maximale Anzahl von Draw-Buffern

            // Baue den Ausgabestring
            let strOut = 
                "WebGL2 Vendor: " + vendor + "<br><br>" + // Hersteller
                "WebGL2 Renderer: " + renderer + "<br><br>" + // Renderer
                "WebGL2 Version: " + version + "<br><br>" + // Version
                "Max Texture Size: " + maxTextureSize + "<br><br>" + // Maximale Texturgröße
                ".atomic Draw Buffers: " + maxDrawBuffers + "<br><br>"; // Maximale Draw-Buffer

            document.body.removeChild(canvas); // Entfernt das Canvas aus dem DOM
            return strOut; // Gibt den formatierten String zurück
        } catch (err) { // Falls ein Fehler auftritt
            return "error: " + err.message; // Gibt eine Fehlermeldung mit Details zurück
        }
    }

    return await calculateWebGL2Fingerprint(); // Ruft die innere Funktion auf und gibt das Ergebnis zurück
}

// 9. Fonts-Fingerprinting
// Diese Funktion überprüft, welche Schriftarten auf dem Gerät des Benutzers installiert sind.
// Sie gibt eine Liste der nicht verfügbaren Schriftarten als String zurück.
function fingerprint_fonts() {
    "use strict"; // Aktiviert den strikten Modus
    const strOnError = "Error"; // Standard-Fehlermeldung
    try { // Fehlerbehandlung für den gesamten Code-Block
        const style = "position: absolute; visibility: hidden; display: block !important"; // CSS-Stil für Test-Divs (versteckt und positioniert)
        const fonts = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"]; // Liste der zu prüfenden Schriftarten
        const count = fonts.length; // Anzahl der Schriftarten in der Liste
        const template = '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',sans-serif !important">ww</b>' + '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',monospace !important">ww</b>'; // HTML-Template für die Tests (zwei Textblöcke mit unterschiedlichen Schriftarten)
        const fragment = document.createDocumentFragment(); // Erstellt ein DocumentFragment für effiziente DOM-Manipulation
        const divs = []; // Array zum Speichern der Test-Divs
        for (let i = 0; i < count; i++) { // Iteriert über alle Schriftarten
            const font = fonts[i].replace(/['"<>]/g, ''); // Entfernt potenziell schädliche Zeichen aus dem Schriftartnamen
            const div = document.createElement('div'); // Erstellt ein neues Div-Element
            div.innerHTML = template.replace(/X/g, font); // Ersetzt 'X' im Template durch den Schriftartnamen
            div.style.cssText = style; // Wendet den definierten Stil an (versteckt)
            fragment.appendChild(div); // Fügt das Div zum Fragment hinzu
            divs.push(div); // Speichert das Div im Array
        }
        document.body.appendChild(fragment); // Fügt das Fragment zum DOM hinzu
        const result = []; // Array für die Ergebnisse (nicht verfügbare Schriftarten)
        for (let i = 0; i < count; i++) { // Iteriert erneut über die Schriftarten
            const e = divs[i].getElementsByTagName('b'); // Ruft die beiden <b>-Elemente im Div ab
            if (e[0].offsetWidth === e[1].offsetWidth) { // Prüft, ob die Breiten gleich sind (Schriftart nicht verfügbar)
                result.push(fonts[i]); // Fügt die Schriftart zur Ergebnisliste hinzu
            }
        }
        for (let i = 0; i < count; i++) { // Iteriert über die Divs
            document.body.removeChild(divs[i]); // Entfernt jedes Test-Div aus dem DOM
        }
        return result.join(' | '); // Gibt die Liste der nicht verfügbaren Schriftarten als String zurück, getrennt durch " | "
    } catch (err) { // Falls ein Fehler auftritt
        return strOnError; // Gibt die Fehlermeldung "Error" zurück
    }
}

// 10. Touch-Support-Fingerprinting
// Diese Funktion überprüft die Touchscreen-Fähigkeiten des Geräts.
// Sie gibt die Ergebnisse als formatierten String zurück.
function fingerprint_touchSupport() {
    "use strict"; // Aktiviert den strikten Modus
    let strSep = "<br>"; // Trennzeichen für die Ausgabe
    try { // Fehlerbehandlung für den gesamten Code-Block
        const n = navigator; // Alias für den Navigator für kürzeren Zugriff
        let maxTouchPoints = 0; // Initialisiert die maximale Anzahl von Touchpunkten
        let touchEvent; // Variable für das Ergebnis der TouchEvent-Unterstützung
        if (n.maxTouchPoints !== undefined) { // Prüft, ob maxTouchPoints verfügbar ist
            maxTouchPoints = parseInt(n.maxTouchPoints, 10); // Konvertiert den Wert in eine Ganzzahl (Basis 10)
        } else if (n.msMaxTouchPoints !== undefined) { // Fallback für ältere Browser (Microsoft)
            maxTouchPoints = n.msMaxTouchPoints; // Setzt den Microsoft-spezifischen Wert
        }
        try { // Versucht, ein TouchEvent zu erstellen
            document.createEvent('TouchEvent'); // Erstellt ein TouchEvent (wirft Fehler, falls nicht unterstützt)
            touchEvent = true; // Setzt auf true, wenn erfolgreich
        } catch { // Falls das Erstellen fehlschlägt
            touchEvent = false; // Setzt auf false
        }
        const touchStart = 'ontouchstart' in window; // Prüft, ob das "ontouchstart"-Ereignis unterstützt wird

        // Baue den Ausgabestring
        let strOut = 
            "maxTouchPoints: " + maxTouchPoints + strSep + strSep + // Maximale Touchpunkte
            "touchEvent: " + touchEvent + strSep + strSep + // Unterstützung für TouchEvent
            "touchStart: " + touchStart + strSep + strSep; // Unterstützung für ontouchstart

        return strOut; // Gibt den formatierten String zurück
    } catch (err) { // Falls ein Fehler auftritt
        return "error: " + err.message; // Gibt eine Fehlermeldung mit Details zurück
    }
}

// Hauptfunktion zur Ausführung aller Fingerprinting-Methoden
// Diese asynchrone Funktion ruft alle Fingerprinting-Funktionen auf und setzt die Ergebnisse in DOM-Elemente.
async function main() {
    const navigatorData = fingerprint_navigator(); // Ruft Navigator-Daten ab
    const intlData = await displayIntlFingerprint(); // Ruft Intl-Daten asynchron ab
    const screenData = fingerprint_screen(); // Ruft Screen-Daten ab
    const viewportData = fingerprint_visualViewport(); // Ruft Visual Viewport-Daten ab
    const canvasData = fingerprint_canvas(); // Ruft Canvas-Daten ab
    const audioData = await displayAudioFingerprint(); // Ruft Audio-Daten asynchron ab
    const webglData = WebGLBasics(); // Ruft WebGL-Daten ab
    const webgl2Data = await fingerprint_webgl2(); // Ruft WebGL2-Daten asynchron ab
    const fontsData = fingerprint_fonts(); // Ruft Fonts-Daten ab
    const touchSupportData = fingerprint_touchSupport(); // Ruft Touch-Support-Daten ab

    // Setzt die Daten in die entsprechenden DOM-Elemente
    setInnerHTML('navigator', navigatorData); // Navigator-Daten in Element mit ID "navigator"
    setInnerHTML('intl', intlData); // Intl-Daten in Element mit ID "intl"
    setInnerHTML('screen', screenData); // Screen-Daten in Element mit ID "screen"
    setInnerHTML('viewport', viewportData); // Viewport-Daten in Element mit ID "viewport"
    setInnerHTML('canvas', canvasData); // Canvas-Daten (Data-URL) in Element mit ID "canvas"
    setInnerHTML('audio', audioData); // Audio-Daten in Element mit ID "audio"
    setInnerHTML('webgl', `<pre>${webglData}</pre>`); // WebGL-Daten in Element mit ID "webgl", umbrochen in <pre> für bessere Lesbarkeit
    setInnerHTML('webgl2', webgl2Data); // WebGL2-Daten in Element mit ID "webgl2"
    setInnerHTML('fonts', fontsData); // Fonts-Daten in Element mit ID "fonts"
    setInnerHTML('mobile', touchSupportData); // Touch-Support-Daten in Element mit ID "mobile"
}

// Starte die Hauptfunktion nach dem Laden des DOM
// Dieser Event-Listener wartet, bis das DOM vollständig geladen ist, bevor die Fingerprinting-Methoden ausgeführt werden.
document.addEventListener('DOMContentLoaded', () => { // Fügt einen Listener für das DOMContentLoaded-Ereignis hinzu
    main().catch(error => console.error("Fehler in main:", error)); // Ruft die Hauptfunktion auf und fängt Fehler ab
});
