![fingerprinter header](/img/fingerprinter.png)

Dieses Github Repository bildet die Basis für die Testwebsite der Bachelorarbeit:

	"Praktische Untersuchung der Gegenmaßnahmen gegen Browserfingerprinting"

Absolviert an der Universität Regensburg von Dominik I.

Die Testwebsite wird gehostet unter:

https://uniregitsec.github.io/Praktische-Untersuchung-der-Gegenmassnahmen-gegen-Browserfingerprinting/

Das Fingerprintingtool umfasst:


Browser- und Systemeigenschaften:

		navigator.plugins

		navigator.hardwareConcurrency

		navigator.deviceMemory

		navigator.language

		navigator.languages

		navigator.platform

		navigator.userAgent

		navigator.appVersion

		navigator.vendor

		getLocale(Intl)

		Intl.DateTimeFormat()
		
		
Bildschirminformationen:

		screen.width

		screen.height

		screen.availWidth

		screen.availHeight

		screen.availTop

		screen.availLeft

		innerWidth

		innerHeight

		visualViewport.height

		visualViewport.width

		outerWidth

		outerHeight

		ScreenX

		ScreenY

		screen.isExtended

		screen.colorDepth

		screen.pixelDepth

		screen.orientation

		devicePixelRatio

WEBGL & WEBGL2:

		unmasked Vendor

		unmasked Renderer

		shading Language Version

		WebGL2 Vendor

		WebGL2 Renderer

		max draw buffers

Audio:

		Audio-sum

		Gain Reduction

		Frequency Data Sum

		Time Domain Data Sum

Canvas:
		
		Canvas-URL
		
Fonts:

		Fonts
		
Mobile:

		maxTouchPoints

		touchEvent

		touchStart
		


Docker:

	docker run -d -p 80:80 --name my-nginx-website -v "$(pwd)/my-website:/usr/share/nginx/html:ro" nginx:latest

