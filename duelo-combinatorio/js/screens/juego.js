/* =========================================================
   Juego: pads, ronda, respuestas y retroalimentación
   ========================================================= */

/* ---------- Pads ---------- */
function buildPads(){
  for(const p of ['p1','p2']){
    $('#pad-'+p).innerHTML = `<div class="pad-name ${p==='p1'?'c1':'c2'}">${esc(S.names[p])}</div>
      <div class="pad-btns">${[0,1,2].map(i=>`<button type="button" class="pad-btn" data-p="${p}" data-slot="${i}"><span class="n">${i+1}</span><kbd>${KEYLBL[p][i]}</kbd></button>`).join('')}</div>
      <div class="pad-state" id="st-${p}">Listo</div>`;
  }
  document.querySelectorAll('.pad-btn').forEach(b=>b.onclick=()=>pick(b.dataset.p, +b.dataset.slot));
}
function padState(p, text, cls){
  const pad=$('#pad-'+p); pad.classList.remove('locked','out'); if(cls) pad.classList.add(cls);
  $('#st-'+p).textContent = text;
  const dis = !!cls || S.round.done;
  pad.querySelectorAll('.pad-btn').forEach(b=>b.disabled=dis);
}

/* ---------- Ronda ---------- */
function startRound(){
  const q = bank()[S.idx];
  S.round = {q, order:shuffle([0,1,2]), picks:{p1:null,p2:null}, out:{p1:false,p2:false},
             winner:null, steal:false, done:false};
  show('play'); paintScore(); buildPads();
  $('#q-sport').textContent = q.sport;
  $('#q-num').textContent = `${S.level===1?'Penal':'Jugada'} ${S.idx+1} / ${bank().length}`;
  $('#q-text').innerHTML = q.q;
  $('#opts').className = 'opts' + (S.level===1?' l1-num':'');
  $('#opts').innerHTML = S.round.order.map((oi,slot)=>`<li class="opt" data-slot="${slot}"><span class="num">${slot+1}</span><span class="otext">${q.opts[oi]}</span><span class="keys"><kbd>${KEYLBL.p1[slot]}</kbd><kbd>${KEYLBL.p2[slot]}</kbd></span></li>`).join('');
  $('#feedback').hidden = true;
  $('#ticker').textContent = S.level===1 ? 'Ambos responden en secreto.' : 'Balón en juego: el primero que acierte se lo lleva.';
  padState('p1','Esperando respuesta'); padState('p2','Esperando respuesta');
}

function pick(p, slot){
  const r=S.round; if(S.screen!=='play'||!r||r.done) return;
  if(S.level===1){
    // Respuesta secreta: sin resaltar el botón para no revelar la elección
    if(r.picks[p]!==null) return;
    r.picks[p]=slot;
    padState(p, 'Respuesta bloqueada', 'locked');
    $('#ticker').textContent = `${S.names[p]} ya disparó.`;
    if(r.picks.p1!==null && r.picks.p2!==null) resolve();
  } else {
    if(r.out[p] || r.picks[p]!==null) return;
    r.picks[p]=slot;
    document.querySelector(`.pad-btn[data-p="${p}"][data-slot="${slot}"]`)?.classList.add('flash');
    if(r.order[slot]===r.q.ans){
      r.winner=p; r.steal=r.out[other(p)]; resolve();
    } else {
      r.out[p]=true; padState(p,'Falló · fuera de la jugada','out');
      const o=other(p);
      if(r.out[o]) return resolve();
      $('#ticker').textContent = `${S.names[p]} falla. El balón pasa a ${S.names[o]}.`;
    }
  }
}

/* ---------- Cierre de la jugada y tarjeta de feedback ---------- */
function resolve(){
  const r=S.round; if(r.done) return; r.done=true;
  const q=r.q, ok = p => r.picks[p]!==null && r.order[r.picks[p]]===q.ans;

  let title;
  if(S.level===1){
    const sc=['p1','p2'].filter(ok);
    sc.forEach(p=>{S.g[p]++; S.hit1[p]++;});
    title = sc.length===2 ? 'Doble gol' : sc.length===1 ? `Gol de ${esc(S.names[sc[0]])}` : 'Nadie anota';
  } else {
    if(r.winner){
      const p=r.winner; S.hit2[p]++; S.e[p]+= r.steal?1:2; if(r.steal) S.steals[p]++;
      title = r.steal ? `${esc(S.names[p])} roba el balón · +1` : `${esc(S.names[p])} diagnostica primero · +2`;
    }
    else title = 'Balón muerto';
  }
  paintScore();

  // Marcar opción correcta y quién eligió qué
  const correctSlot = r.order.indexOf(q.ans);
  document.querySelectorAll('#opts .opt').forEach(li=>{
    const s=+li.dataset.slot; li.classList.add(s===correctSlot?'correct':'dim');
    const keys=li.querySelector('.keys'); keys.innerHTML='';
    for(const p of ['p1','p2']) if(r.picks[p]===s) keys.insertAdjacentHTML('beforeend',`<span class="pick ${p}">${p==='p1'?'J1':'J2'}</span>`);
  });
  document.querySelectorAll('.pad-btn').forEach(b=>b.disabled=true);
  $('#ticker').textContent='';

  const row = p => {
    const s=r.picks[p];
    const what = s===null ? 'Sin respuesta' : `Eligió ${s+1}`;
    let res;
    if(S.level===1) res = ok(p) ? '<span class="res ok">✓ GOL</span>' : '<span class="res bad">✗ ATAJADO</span>';
    else res = r.winner===p ? `<span class="res ok">✓ +${r.steal?1:2}</span>` : s===null ? '<span class="res none">—</span>' : '<span class="res bad">✗ FALLO</span>';
    return `<div class="fb-row"><span class="who ${p==='p1'?'c1':'c2'}">${esc(S.names[p])}</span><span class="what">${what}</span>${res}</div>`;
  };
  const trace = S.level===2 ? `<div class="crit"><span class="chip ${q.orden?'yes':'no'}">¿Importa el orden? ${q.orden?'Sí':'No'}</span>${q.orden?`<span class="chip ${q.todos?'yes':'no'}">¿Se usan todos? ${q.todos?'Sí':'No'}</span>`:''}<span class="chip">→ ${!q.orden?'Combinación':q.todos?'Permutación':'Variación'}</span></div>` : '';
  const last = S.idx===bank().length-1;

  const fb=$('#feedback');
  fb.innerHTML = `<div class="eyebrow">${S.level===1?'Revisión del penal':'Decisión del VAR'}</div><h3>${title}</h3>
    <div class="fb-rows">${row('p1')}${row('p2')}</div>
    ${trace}
    <p class="fb-exp"><b>Correcta: opción ${correctSlot+1}.</b> ${q.exp}</p>
    <div class="row"><button class="btn primary" type="button" id="next">${last ? (S.level===1?'Pasar al VAR táctico':'Ver resultado final') : 'Siguiente jugada'} <kbd>Espacio</kbd></button></div>`;
  fb.hidden=false;
  $('#next').onclick=next;
  fb.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth', block:'nearest'});
}

function next(){
  S.idx++;
  if(S.idx < bank().length) startRound();
  else if(S.level===1) intro(2);
  else final();
}
