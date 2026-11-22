# SpeedyScript

Il sito del brand **SpeedyScript**: script su misura, automazioni e integrazioni software.

**Sito:** https://mikeminer.github.io/speedyscript/

**Richieste:** il modulo inoltra le richieste a **mikforlani@gmail.com** tramite [FormSubmit](https://formsubmit.co/). L’indirizzo email di ricontatto del visitatore è obbligatorio. Non serve un account GitHub e le richieste non vengono pubblicate.

## Contenuti

- Automazioni Python e PowerShell.
- Script e interfacce PJSR per PixInsight.
- Integrazioni API e AI.
- Elaborazione di file, dati e report.
- Anteprima del brief nel browser e invio via email.
- Esempio reale: AstroGuard per PixInsight, con l’immagine fornita dal suo autore.
- Per gli script PixInsight: test del funzionamento e demo live insieme in videocall prima della consegna.

Le dimostrazioni nell’editor sono illustrative: non eseguono codice o elaborazioni reali. Prezzi, tempi, compatibilità e verifiche sono da concordare per ogni progetto.

## Sviluppo locale

Il sito è statico, senza dipendenze JavaScript e senza build.

Con Python installato:

    python -m http.server 5178 --directory docs

Aprire http://localhost:5178.

Per controllare la sintassi JavaScript con Node.js:

    node --check docs/assets/site.js

## Pubblicazione

GitHub Pages pubblica la cartella /docs dal ramo main. I collegamenti canonici, la sitemap e i metadati social usano l’indirizzo del sito riportato sopra. Se si cambia repository o dominio, aggiornarli insieme.

## Attivazione dell’invio email

Il modulo usa un POST HTTPS nativo a FormSubmit e funziona anche senza JavaScript. Il campo con nome email imposta l’indirizzo di risposta del richiedente. Sono presenti un honeypot e la verifica antispam del servizio; non sono state disabilitate le protezioni reCAPTCHA.

Al primo invio FormSubmit manda un’email di attivazione al destinatario: **confermare l’attivazione da mikforlani@gmail.com** prima di considerare operativo l’inoltro. L’attivazione e l’effettiva consegna in casella sono passaggi distinti dai controlli locali del sito.

Il servizio gestisce conferme, controlli antispam ed errori sulla propria pagina; dopo il percorso completato torna a grazie.html. La pagina di ringraziamento statica non è una ricevuta di consegna in casella. Non sono implementati retry automatici né invii attraverso Gmail dal browser.

L’indirizzo destinatario, l’oggetto e il ritorno al sito sono configurati nel form in docs/index.html. Nessuna password o chiave SMTP è inclusa nel repository. Il servizio è esterno: consultare le sue condizioni e l’informativa in docs/privacy.html.

## File principali

- docs/index.html: contenuti, struttura accessibile e metadati.
- docs/assets/site.css: grafica e layout responsive.
- docs/assets/site.js: menu, demo e generazione del brief.
- docs/privacy.html: funzionamento dei dati e collegamenti esterni.
- docs/grazie.html: ritorno dopo l’invio tramite il servizio.
- docs/assets/astroguard-pixinsight.png: schermata di AstroGuard fornita dall’autore, senza modifiche; il sorgente dello script non è distribuito da questo sito.
- docs/assets/social.png: immagine per le anteprime dei link.

Il carattere Manrope è distribuito con la sua [SIL Open Font License](docs/assets/fonts/OFL.txt). Marchio, testi e grafica del sito sono originali SpeedyScript. Non è concessa una licenza generale aggiuntiva sul resto del repository.
