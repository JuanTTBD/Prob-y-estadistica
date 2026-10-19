/* =========================================================
   Estado global, navegación entre pantallas y marcador
   ========================================================= */
const KEYS = {a:['p1',0],s:['p1',1],d:['p1',2],j:['p2',0],k:['p2',1],l:['p2',2]};
const KEYLBL = {p1:['A','S','D'], p2:['J','K','L']};
const SCREENS = ['home','board','intro','play','final'];
const other = p => p==='p1'?'p2':'p1';

let S;
function reset(){
  S = {screen:'home', level:1, idx:0, round:null,
       names:{p1:'Local',p2:'Visitante'},
       g:{p1:0,p2:0}, e:{p1:0,p2:0}, hit1:{p1:0,p2:0}, hit2:{p1:0,p2:0}, steals:{p1:0,p2:0}};
}
/* Reinicia el marcador conservando los nombres */
function resetKeepNames(){
  const n = S.names; reset(); S.names = n;
}

const bank = () => S.level===1 ? L1 : L2;

function show(screen){
  S.screen = screen;
  for(const id of SCREENS) $('#s-'+id).hidden = id!==screen;
  $('#sb').hidden = !['intro','play','final'].includes(screen);
  window.scrollTo({top:0});
}

function paintScore(){
  for(const p of ['p1','p2']){
    const n = p==='p1'?1:2;
    $('#sb-n'+n).textContent = S.names[p];
    $('#sb-s'+n).textContent = S.level===1 ? S.g[p] : S.e[p];
    $('#sb-x'+n).textContent = `Goles ${S.g[p]} · Estrategia ${S.e[p]}`;
  }
  $('#sb-level').textContent = S.screen==='final' ? 'Final' : S.level===1 ? 'N1 · Penales' : 'N2 · VAR';
}

function readNames(){
  S.names.p1 = $('#name1').value.trim() || 'Jugador 1';
  S.names.p2 = $('#name2').value.trim() || 'Jugador 2';
}
