/* =========================================================
   Intro de nivel: reglas antes de cada minijuego
   ========================================================= */
function intro(level){
  S.level = level; S.idx = 0; S.round = null;
  const l1 = level===1;
  $('#s-intro').innerHTML = `
    <div class="eyebrow">Nivel ${level} · ${l1?'Dominio operativo':'Análisis conceptual'}</div>
    <h2>${l1?'Definición por penales':'El VAR táctico'}</h2>
    <p>${l1
      ? 'Diez situaciones para calcular. Ambos jugadores responden en secreto, sin límite de tiempo. Cada resultado correcto es un gol.'
      : 'Diez jugadas para diagnosticar. No hace falta calcular: decide si importa el orden y si se usan todos los elementos. El primero que acierta roba el balón.'}</p>
    <ul class="rules">${l1 ? `
      <li>Sin límite de tiempo. La respuesta queda bloqueada al pulsar; el rival no ve cuál elegiste.</li>
      <li>Acierto: +1 gol. Pueden anotar los dos en la misma jugada.</li>
      <li>La jugada termina cuando ambos responden.</li>` : `
      <li>Sin límite de tiempo, pero es un duelo de reacción: el primer diagnóstico correcto gana +2 puntos de estrategia.</li>
      <li>Si fallas, quedas fuera de la jugada y el rival recibe el balón: si acierta, roba +1.</li>
      <li>Si nadie acierta, el balón queda muerto.</li>`}
      <li><span class="c1">${esc(S.names.p1)}</span>: <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> &nbsp;·&nbsp; <span class="c2">${esc(S.names.p2)}</span>: <kbd>J</kbd> <kbd>K</kbd> <kbd>L</kbd> &nbsp;→ opciones 1, 2, 3.</li>
    </ul>
    <div class="row"><button class="btn primary" type="button" id="go">Comenzar <kbd>Espacio</kbd></button></div>`;
  $('#go').onclick = startRound;
  show('intro'); paintScore();
}
