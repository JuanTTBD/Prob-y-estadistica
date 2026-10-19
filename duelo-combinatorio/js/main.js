/* =========================================================
   Punto de entrada: inicialización y eventos globales
   ========================================================= */
reset();
renderBoard();

/* ---------- Navegación ---------- */
$('#setup').addEventListener('submit', e=>{ e.preventDefault(); readNames(); show('board'); });
$('#skip').onclick  = ()=>{ readNames(); intro(1); };
$('#to-l1').onclick = ()=>{ readNames(); intro(1); };
$('#sb-exit').onclick = ()=>{ resetKeepNames(); show('home'); };

/* ---------- Teclado: A/S/D (J1), J/K/L (J2), Espacio/Enter para avanzar ---------- */
document.addEventListener('keydown', e=>{
  if(e.target.matches('input,textarea') || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
  const k=e.key.toLowerCase();
  if(S.screen==='play' && KEYS[k]){ e.preventDefault(); pick(...KEYS[k]); return; }
  if(k===' ' || k==='enter'){
    if(e.target.matches('button') && k==='enter') return;
    const act = S.screen==='board' ? ()=>{ readNames(); intro(1); }
      : S.screen==='intro' ? startRound
      : S.screen==='play' && S.round?.done ? next
      : S.screen==='final' ? rematch : null;
    if(act){ e.preventDefault(); act(); }
  }
});
