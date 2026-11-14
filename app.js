const island=document.querySelector("#island"), expanded=document.querySelector("#expanded"), panel=document.querySelector("#panel"), content=document.querySelector("#dialogContent");
const clock=document.querySelector("#clock");
function tick(){const d=new Date();clock.textContent=d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});}
tick();setInterval(tick,15000);
function toggleIsland(force){const open=force??expanded.hidden;expanded.hidden=!open;island.setAttribute("aria-expanded",String(open));island.style.width=open?"220px":"180px";island.setAttribute("aria-label",open?"Recolher NEX Island":"Expandir NEX Island");}
island.addEventListener("click",()=>toggleIsland());document.querySelector("#close").addEventListener("click",()=>toggleIsland(false));
document.querySelector("#play").addEventListener("click",e=>{e.currentTarget.textContent=e.currentTarget.textContent==="▶"?"Ⅱ":"▶";document.querySelector("#trackName").textContent="Demonstração NEX Island";document.querySelector("#trackArtist").textContent="Controles visuais • sem áudio"}); 
function show(type){
 let html="";
 if(type==="music"){html="<h3>♫ Música</h3><p>Este protótipo demonstra a aparência do player. Uma PWA não consegue controlar universalmente o áudio de outros aplicativos nem ler todas as informações de reprodução do iOS.</p><p>Toque na cápsula para ver o cartão de reprodução demonstrativo.</p>";}
 if(type==="timer"){html='<h3>◷ Temporizador</h3><p>Defina uma contagem regressiva demonstrativa.</p><input id="minutes" type="number" min="1" max="180" value="5" aria-label="Minutos"><button id="startTimer">Iniciar temporizador</button><p id="timerResult">Pronto para iniciar.</p>'; }
 if(type==="battery"){html="<h3>ϟ Bateria</h3><p>O Safari no iPhone limita o acesso ao nível e ao estado da bateria. Por isso, esta versão não inventa uma porcentagem: mostra apenas a limitação da plataforma.</p>";}
 if(type==="about"){html="<h3>NEX Island</h3><p>Versão 0.1 • Protótipo PWA</p><p>Uma experiência visual inspirada na Dynamic Island, adaptada à tela do iPhone 11.</p><p>Esta ilha funciona dentro do aplicativo instalado na tela inicial. O iOS não permite sobreposição permanente sobre outros aplicativos via PWA.</p>";}
 content.innerHTML=html;panel.showModal();
 const start=document.querySelector("#startTimer");if(start)start.addEventListener("click",()=>{let sec=Math.max(1,Math.min(180,Number(document.querySelector("#minutes").value)||1))*60;const out=document.querySelector("#timerResult");start.disabled=true;const end=Date.now()+sec*1000;const update=()=>{const left=Math.max(0,Math.ceil((end-Date.now())/1000));out.textContent=left?`${Math.floor(left/60)}:${String(left%60).padStart(2,"0")} restantes`:"Tempo encerrado.";if(left)setTimeout(update,500);else start.disabled=false;};update();});
}
document.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>{const type=b.dataset.action;if(type==="music"){toggleIsland(true);document.querySelector("#expandedTitle").textContent="Música";}else show(type);}));
document.querySelector("#dialogClose").addEventListener("click",()=>panel.close());
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
