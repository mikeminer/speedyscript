# SpeedyScript

Il sito del brand **SpeedyScript**: script su misura, automazioni e integrazioni software.

**Sito:** https://mikeminer.github.io/speedyscript/

**Richieste:** [GitHub Discussions](https://github.com/mikeminer/speedyscript/discussions). Le discussioni sono pubbliche: non inserire credenziali o dati riservati. Non viene pubblicato alcun indirizzo email di contatto.

## Contenuti

- Automazioni Python e PowerShell.
- Script e interfacce PJSR per PixInsight.
- Integrazioni API e AI.
- Elaborazione di file, dati e report.
- Brief preparato nel browser e modificabile prima della pubblicazione su GitHub.

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

GitHub Discussions deve essere attivo. La categoria usata per le bozze è configurata in docs/assets/site.js; verificarne lo slug in caso di riorganizzazione del forum. Il pulsante prepara una bozza, non pubblica automaticamente. Per brief lunghi viene mantenuto il testo completo da copiare, evitando di troncarlo nell’URL.

## File principali

- docs/index.html: contenuti, struttura accessibile e metadati.
- docs/assets/site.css: grafica e layout responsive.
- docs/assets/site.js: menu, demo e generazione del brief.
- docs/privacy.html: funzionamento dei dati e collegamenti esterni.
- docs/assets/social.png: immagine per le anteprime dei link.

Il carattere Manrope è distribuito con la sua [SIL Open Font License](docs/assets/fonts/OFL.txt). Marchio, testi e grafica del sito sono originali SpeedyScript. Non è concessa una licenza generale aggiuntiva sul resto del repository.
