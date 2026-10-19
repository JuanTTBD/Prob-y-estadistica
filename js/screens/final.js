/* =========================================================
   Pantalla final: resultado, estadísticas y lectura grupal
   ========================================================= */
function final(){
  S.round=null;
  const tot = p => S.g[p]+S.e[p];
  const a=tot('p1'), b=tot('p2');
  const head = a===b ? 'Empate' : `Gana ${esc(S.names[a>b?'p1':'p2'])}`;
  $('#s-final').innerHTML = `
    <div class="eyebrow">Pitazo final</div>
    <h2>${head}</h2>
    <p class="lede">${a===b ? 'Mismo total de goles y puntos de estrategia. Pidan revancha.' : `${a>b?a:b} a ${a>b?b:a} en el total combinado.`}</p>
    <div class="tbl-wrap"><table>
      <thead><tr><th>Estadística</th><th class="c1">${esc(S.names.p1)}</th><th class="c2">${esc(S.names.p2)}</th></tr></thead>
      <tbody>
        <tr><td>N1 · Cálculos correctos</td><td>${S.hit1.p1}/${L1.length}</td><td>${S.hit1.p2}/${L1.length}</td></tr>
        <tr><td>N1 · Goles</td><td>${S.g.p1}</td><td>${S.g.p2}</td></tr>
        <tr><td>N2 · Diagnósticos ganados</td><td>${S.hit2.p1}/${L2.length}</td><td>${S.hit2.p2}/${L2.length}</td></tr>
        <tr><td>N2 · Balones robados</td><td>${S.steals.p1}</td><td>${S.steals.p2}</td></tr>
        <tr><td>N2 · Puntos de estrategia</td><td>${S.e.p1}</td><td>${S.e.p2}</td></tr>
      </tbody>
      <tfoot><tr><td>Total</td><td>${a}</td><td>${b}</td></tr></tfoot>
    </table></div>
    <p class="tip">${feedbackLine()}</p>
    <div class="row"><button class="btn primary" type="button" id="again">Revancha <kbd>Espacio</kbd></button><button class="btn" type="button" id="toboard">Repasar el pizarrón</button></div>`;
  show('final'); paintScore();
  $('#again').onclick=rematch;
  $('#toboard').onclick=()=>{ resetKeepNames(); show('board'); };
}

function feedbackLine(){
  const n1=S.hit1.p1+S.hit1.p2, n2=S.hit2.p1+S.hit2.p2;
  if(n1/(2*L1.length) < 0.6) return 'Lectura para el grupo: el cálculo flojea. Repasen cuándo dividir por k! y la diferencia entre n^k y una variación.';
  if(n2/L2.length < 0.7) return 'Lectura para el grupo: el criterio conceptual flojea. Busquen roles ocultos (turnos, dorsales, local/visitante): son orden.';
  return 'Lectura para el grupo: buen dominio de cálculo y de criterio. Prueben a explicar en voz alta cada decisión del VAR.';
}

function rematch(){
  resetKeepNames(); intro(1);
}
