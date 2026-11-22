"use strict";
document.documentElement.classList.remove("no-js");
const SITE = Object.freeze({repository:"https://github.com/mikeminer/speedyscript",discussionCategory:"ideas"});
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const menu=document.querySelector(".menu-toggle"),navigation=document.querySelector("#navigation");
if(menu&&navigation){
  const closeMenu=()=>{menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Apri menu");navigation.classList.remove("is-open");};
  menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Chiudi menu":"Apri menu");navigation.classList.toggle("is-open",open);});
  navigation.addEventListener("click",event=>{if(event.target.closest("a"))closeMenu();});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menu.getAttribute("aria-expanded")==="true"){closeMenu();menu.focus();}});
  document.addEventListener("pointerdown",event=>{if(!event.target.closest(".header"))closeMenu();});
  window.matchMedia("(min-width: 701px)").addEventListener("change",closeMenu);
}

const DEMOS=Object.freeze({
  files:{
    filename:"organizza_file.py",
    code:'# Un compito ripetitivo, automatizzato.\nfrom pathlib import Path\n\ncartella = Path("./documenti")\n\nfor file in cartella.iterdir():\n    organizza(file)\n    aggiorna_report(file)',
    output:["Lettura della cartella d’esempio…","File organizzati per tipo (simulazione).","Report d’esempio pronto. Un compito in meno."]
  },
  pix:{
    filename:"il_tuo_workflow.js",
    code:'// Un esempio di flusso per PixInsight.\nconst source = ImageWindow.activeWindow;\nconst copy = creaCopia(source);\n\nverificaParametri(copy);\napplicaIlTuoFlusso(copy);\ncopy.show();\n// Verifiche sul tuo ambiente, concordate.',
    output:["Selezione di una vista d’esempio…","Elaborazione su una copia (simulazione).","Un workflow progettato per la tua immagine."]
  },
  api:{
    filename:"collega_strumenti.js",
    code:'// I tuoi servizi, nello stesso workflow.\nconst dati = await leggiDalServizio();\n\nconst risultato = await elabora(dati);\n\nawait preparaReport(risultato);\naggiornaIlTuoStrumento(risultato);\n// Un’integrazione costruita sul tuo caso.',
    output:["Lettura di dati d’esempio…","Servizi collegati nel flusso dimostrativo.","Risultato pronto per il prossimo passaggio."]
  }
});
const tabs=Array.from(document.querySelectorAll("[data-demo]"));
const code=document.querySelector("#demo-code"),filename=document.querySelector("#demo-filename");
const panel=document.querySelector("#demo-panel"),runButton=document.querySelector("#run-demo"),output=document.querySelector("#demo-output");
let activeDemo="files",timers=[],runGeneration=0;
function clearDemoTimers(){
  timers.forEach(clearTimeout);timers=[];runGeneration+=1;
  if(runButton){runButton.disabled=false;runButton.removeAttribute("aria-busy");runButton.querySelector("span").textContent="Esegui la demo";}
}
// Source is displayed as text nodes. No demo or visitor input is evaluated.
function renderCode(source){
  const tokens=/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#[^\n]*|\/\/[^\n]*|\b(?:from|import|for|in|const|await|async|function|return|let)\b)/g;
  const fragment=document.createDocumentFragment();let position=0;
  for(const match of source.matchAll(tokens)){
    fragment.append(document.createTextNode(source.slice(position,match.index)));
    const span=document.createElement("span"),token=match[0];
    span.className=token.startsWith("#")||token.startsWith("//")?"syntax-comment":token.startsWith('"')||token.startsWith("'")?"syntax-string":"syntax-keyword";
    span.textContent=token;fragment.append(span);position=match.index+token.length;
  }
  fragment.append(document.createTextNode(source.slice(position)));code.replaceChildren(fragment);
}
function resetOutput(){
  output.replaceChildren();const line=document.createElement("p"),prompt=document.createElement("span");
  prompt.className="prompt";prompt.textContent="$";line.append(prompt,document.createTextNode(" Pronto per il tuo prossimo compito."));output.append(line);
}
function selectDemo(tab,focus=false){
  clearDemoTimers();activeDemo=tab.dataset.demo;
  tabs.forEach(item=>{const selected=item===tab;item.setAttribute("aria-selected",String(selected));item.tabIndex=selected?0:-1;});
  panel.setAttribute("aria-labelledby",tab.id);filename.textContent=DEMOS[activeDemo].filename;renderCode(DEMOS[activeDemo].code);resetOutput();if(focus)tab.focus();
}
if(code&&filename&&panel&&runButton&&output){
  tabs.forEach((tab,index)=>{
    tab.addEventListener("click",()=>selectDemo(tab));
    tab.addEventListener("keydown",event=>{
      let target=null;
      if(event.key==="ArrowRight")target=(index+1)%tabs.length;
      if(event.key==="ArrowLeft")target=(index+tabs.length-1)%tabs.length;
      if(event.key==="Home")target=0;if(event.key==="End")target=tabs.length-1;
      if(target!==null){event.preventDefault();selectDemo(tabs[target],true);}
    });
  });
  runButton.addEventListener("click",()=>{
    clearDemoTimers();const generation=runGeneration,demo=DEMOS[activeDemo];output.replaceChildren();
    runButton.disabled=true;runButton.setAttribute("aria-busy","true");runButton.querySelector("span").textContent="Demo in corso…";
    demo.output.forEach((text,index)=>{
      const showLine=()=>{
        if(generation!==runGeneration)return;
        const line=document.createElement("p");if(index===demo.output.length-1)line.className="done";line.textContent=text;output.append(line);
        if(index===demo.output.length-1){runButton.disabled=false;runButton.removeAttribute("aria-busy");runButton.querySelector("span").textContent="Ripeti la demo";}
      };
      if(reducedMotion.matches)showLine();else timers.push(setTimeout(showLine,120+index*450));
    });
  });
}

const briefForm=document.querySelector("#brief-form"),result=document.querySelector("#brief-result");
const preview=document.querySelector("#brief-preview"),requestLink=document.querySelector("#github-request");
const status=document.querySelector("#form-status"),copyButton=document.querySelector("#copy-brief");
if(briefForm&&result&&preview&&requestLink&&status&&copyButton){
  const service=document.querySelector("#service"),environment=document.querySelector("#environment");
  const title=document.querySelector("#project-name"),details=document.querySelector("#project-details"),timing=document.querySelector("#timing");
  briefForm.querySelector('[type="submit"]').disabled=false;
  function invalidateBrief(){result.hidden=true;preview.value="";status.textContent="";copyButton.textContent="Copia il brief";}
  briefForm.addEventListener("input",invalidateBrief);briefForm.addEventListener("change",invalidateBrief);
  document.querySelectorAll("[data-service]").forEach(link=>{
    link.addEventListener("click",()=>{
      service.value=link.dataset.service;
      if(service.value==="Script PixInsight"&&environment.value==="Da definire")environment.value="PixInsight";
      invalidateBrief();
    });
  });
  briefForm.addEventListener("submit",event=>{
    event.preventDefault();
    const cleanTitle=title.value.trim(),cleanDetails=details.value.trim();
    title.setCustomValidity(cleanTitle.length<5?"Scrivi un titolo di almeno 5 caratteri.":"");
    details.setCustomValidity(cleanDetails.length<20?"Descrivi l’obiettivo in almeno 20 caratteri.":"");
    if(!briefForm.reportValidity())return;
    const body=["## Richiesta SpeedyScript","","**Progetto:** "+cleanTitle,"**Tipo di script:** "+service.value,"**Ambiente:** "+environment.value,"**Priorità:** "+timing.value,"","### Obiettivo e risultato atteso",cleanDetails,"","---","Brief preparato dal sito SpeedyScript. Dettagli e tempi da concordare."].join("\n");
    const url=new URL(SITE.repository+"/discussions/new");
    url.searchParams.set("category",SITE.discussionCategory);url.searchParams.set("title","[Richiesta] "+cleanTitle);url.searchParams.set("body",body);
    // Complete text is always copyable; never silently truncate long Unicode.
    if(url.href.length>6000)url.searchParams.delete("body");
    preview.value=body;requestLink.href=url.href;result.hidden=false;
    status.textContent="Brief pronto. Puoi copiarlo e rivederlo su GitHub prima di pubblicarlo.";
    document.querySelector("#brief-heading").focus({preventScroll:true});
    result.scrollIntoView({behavior:reducedMotion.matches?"auto":"smooth",block:"nearest"});
  });
  [title,details].forEach(field=>field.addEventListener("input",()=>field.setCustomValidity("")));
  copyButton.addEventListener("click",async()=>{
    try{
      if(!navigator.clipboard)throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(preview.value);copyButton.textContent="Brief copiato";
      status.textContent="Brief copiato. Apri Discussions per rivedere e pubblicare la richiesta.";
    }catch{
      preview.focus();preview.select();status.textContent="Testo selezionato: usa Copia dal tuo dispositivo, poi apri Discussions.";
    }
  });
}
// Core content stays visible without JavaScript or with reduced motion.
if("IntersectionObserver" in window&&!reducedMotion.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("reveal-visible");observer.unobserve(entry.target);}
  }),{threshold:.08});
  document.querySelectorAll("[data-reveal]").forEach(item=>{item.classList.add("reveal-pending");observer.observe(item);});
}
