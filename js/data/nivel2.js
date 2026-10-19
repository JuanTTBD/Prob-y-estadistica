/* =========================================================
   NIVEL 2 · El VAR táctico (análisis conceptual)
   Además de los campos del nivel 1, cada jugada indica
   orden (¿importa el orden?) y todos (¿se usan los n?),
   que alimentan la traza del árbol de decisión.
   ========================================================= */
const L2 = [
  {sport:"Fútbol", q:"En la tanda de penales, el DT elige 5 cobradores entre sus 11 jugadores en cancha y decide quién patea 1.º, 2.º, … 5.º.",
   opts:[`Combinación ${C(11,5)}: solo importa quiénes patean`, `Variación ${V(11,5)}: 5 de 11, y el turno los distingue`, `Permutación ${P(11)}: se ordenan los 11 jugadores`], ans:1, orden:true, todos:false,
   exp:`Cambiar el turno de dos cobradores da otra tanda, así que el orden importa. Solo patean 5 de los 11: es una variación, ${V(11,5)}.`},
  {sport:"Baloncesto", q:"El entrenador escoge el quinteto titular de entre 12 jugadores, sin asignar posiciones.",
   opts:[`Variación ${V(12,5)}: el quinteto se presenta en un orden`, `Combinación ${C(12,5)}: el quinteto es un grupo`, `Permutación ${P(5)}: se ordenan los 5 titulares`], ans:1, orden:false, todos:false,
   exp:`El orden de presentación no cambia quiénes juegan. Sin roles, el quinteto es un subconjunto: ${C(12,5)}.`},
  {sport:"Atletismo", q:"Los 8 finalistas de 100 m se sortean en los carriles 1 a 8.",
   opts:[`Permutación ${P(8)}: los 8 atletas ocupan los 8 carriles`, `Variación ${V(8,3)}: solo cuentan los carriles centrales`, `Combinación ${C(8,8)}: los 8 ya están elegidos`], ans:0, orden:true, todos:true,
   exp:`Cada carril es una posición distinta y entran los 8 atletas: k = n, permutación ${P(8)} = 8!. ${C(8,8)} = 1 solo dice quiénes corren, no dónde.`},
  {sport:"Tenis", q:"El capitán de Copa Davis forma la pareja de dobles con 2 de sus 6 tenistas.",
   opts:[`Permutación ${P(6)}: hay que ordenar a los 6`, `Variación ${V(6,2)}: quien saca primero define la pareja`, `Combinación ${C(6,2)}: una pareja no tiene orden`], ans:2, orden:false, todos:false,
   exp:`La pareja (A, B) es la misma que (B, A). El turno de saque se decide en el partido, no en la convocatoria: ${C(6,2)}.`},
  {sport:"Baloncesto", q:"En la votación al MVP hay 15 candidatos y se publica el podio: 1.º, 2.º y 3.º.",
   opts:[`Variación ${V(15,3)}: 3 de 15 en puestos distintos`, `Combinación ${C(15,3)}: solo importa quién entra al podio`, `Permutación ${P(15)}: se ordena a los 15 candidatos`], ans:0, orden:true, todos:false,
   exp:`Ser 1.º o 3.º no es lo mismo: el orden importa. Solo se ordenan 3 de los 15: ${V(15,3)}.`},
  {sport:"Fútbol americano", q:"El quarterback tiene 7 receptores y la jugada asigna 4 rutas distintas: corta, media, profunda y señuelo.",
   opts:[`Combinación ${C(7,4)}: son 4 receptores sin más`, `Permutación ${P(7)}: los 7 receptores corren rutas`, `Variación ${V(7,4)}: cada receptor recibe una ruta distinta`], ans:2, orden:true, todos:false,
   exp:`Asignar roles distintos equivale a ordenar: si dos receptores intercambian rutas, la jugada cambia. Se usan 4 de 7: ${V(7,4)}.`},
  {sport:"Tenis", q:"En un round robin de 8 tenistas, cada pareja se enfrenta una sola vez. ¿Qué modelo cuenta los partidos?",
   opts:[`Combinación ${C(8,2)}: A contra B es el mismo partido que B contra A`, `Variación ${V(8,2)}: A–B y B–A son partidos distintos`, `Permutación ${P(8)}: se ordena el cuadro completo`], ans:0, orden:false, todos:false,
   exp:`Con un único encuentro por pareja, invertir los nombres no crea otro partido: ${C(8,2)} = 28.`},
  {sport:"Fútbol", q:"Una liga de 8 equipos juega ida y vuelta: cada pareja se enfrenta una vez en cada estadio.",
   opts:[`Combinación ${C(8,2)}: un partido es una pareja de equipos`, `Variación ${V(8,2)}: local y visitante distinguen el partido`, `Permutación ${P(8)}: se ordena la tabla de posiciones`], ans:1, orden:true, todos:false,
   exp:`Aquí sí importa el orden: A local contra B no es el mismo partido que B local contra A. ${V(8,2)} = 56 = 2·${C(8,2)}.`},
  {sport:"Atletismo", q:"El relevo 4×400 ya tiene a sus 4 atletas. Falta decidir quién corre cada posta.",
   opts:[`Combinación ${C(4,4)}: los 4 ya están elegidos, hay 1 forma`, `Permutación ${P(4)}: se ordenan los 4 en las 4 postas`, `Variación ${V(4,2)}: solo importan la primera y la última posta`], ans:1, orden:true, todos:true,
   exp:`Cada posta es un rol distinto y participan los 4: k = n, permutación ${P(4)}. ${C(4,4)} = 1 cuenta el grupo, no el orden.`},
  {sport:"Fútbol", q:`Un club convoca 3 delanteros de 9 y lo cuenta con ${C(9,3)}. Luego les asigna los dorsales 9, 10 y 11. ¿Qué modelo cuenta ahora las opciones?`,
   opts:[`Sigue siendo ${C(9,3)}: los jugadores son los mismos`, `Pasa a ${V(9,3)} = ${C(9,3)}·3!: cada grupo admite 3! repartos de dorsal`, `Pasa a ${P(9)}: hay que ordenar a todo el plantel`], ans:1, orden:true, todos:false,
   exp:`Al asignar dorsales distintos aparece el orden. Cada trío se puede repartir de 3! = 6 formas: ${V(9,3)} = 84·6 = 504.`},
];
