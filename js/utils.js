/* =========================================================
   Utilidades: DOM, notación matemática y helpers genéricos
   ========================================================= */
const $ = s => document.querySelector(s);

/* Notación combinatoria en HTML */
const P = n => `<span class="fx">P<sub>${n}</sub></span>`;
const V = (n,k) => `<span class="fx">V<span class="ix"><sup>${n}</sup><sub>${k}</sub></span></span>`;
const C = (n,k) => `<span class="fx">C<span class="ix"><sup>${n}</sup><sub>${k}</sub></span></span>`;
const fr = (a,b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;

/* Copia barajada (Fisher–Yates) */
function shuffle(a){
  a = a.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

/* Escapa texto del usuario antes de insertarlo como HTML */
const esc = s => s.replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
