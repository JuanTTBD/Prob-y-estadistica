/* =========================================================
   Pizarrón táctico: tarjetas de fórmulas y tabla de factoriales
   (el árbol de decisión es SVG estático en index.html)
   ========================================================= */
const MODELOS = [
  {t:"Permutación", f:`${P("n")} = n!`, d:"Ordenar los n elementos disponibles. Todos participan y cada posición es distinta.",
   c:[["Orden",1],["Todos",1]], e:`Sorteo de 8 carriles para 8 finalistas: ${P(8)} = 8! = <b>40 320</b>.`},
  {t:"Variación", f:`${V("n","k")} = ${fr("n!","(n − k)!")}`, d:"Elegir k de n elementos y colocarlos en posiciones o roles distintos.",
   c:[["Orden",1],["Todos",0]], e:`Podio de 3 entre 8 atletas: ${V(8,3)} = 8·7·6 = <b>336</b>.`},
  {t:"Combinación", f:`${C("n","k")} = ${fr("n!","k!(n − k)!")}`, d:"Elegir un grupo de k entre n. Reordenar el grupo no produce un caso nuevo.",
   c:[["Orden",0],["Subconjunto",1]], e:`Quinteto de 5 entre 12 jugadores: ${C(12,5)} = <b>792</b>.`},
];

function renderBoard(){
  $('#cards').innerHTML = MODELOS.map(x=>`
    <article class="fcard">
      <div class="eyebrow">Modelo</div>
      <h3>${x.t}</h3>
      <div class="big">${x.f}</div>
      <p>${x.d}</p>
      <div class="crit">${x.c.map(([l,v])=>`<span class="chip ${v?'yes':'no'}">${l}: ${v?'sí':'no'}</span>`).join('')}</div>
      <div class="ex">${x.e}</div>
    </article>`).join('');

  let f=1, h='';
  for(let i=0;i<=11;i++){ if(i>0) f*=i; h+=`<span><em>${i}!</em>${f.toLocaleString('es-CO')}</span>`; }
  $('#fact').innerHTML = h;
}
