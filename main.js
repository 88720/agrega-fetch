let noSocio = localStorage.getItem("noSocio");
let tel = localStorage.getItem("tel");

//se implementa un fetch local
let actividades;
let html;
function traerActividades() {
  fetch("data.json")
    .then((res) => res.json())
    .then((json) => {
      //sale por consola para comprobar
      console.log(json);
      actividades = json;
      let actividadesHtml = "";
      for (let i = 0; i < json.length; i++) {
        actividadesHtml =
          actividadesHtml +
          "<div><h3> categoria:" +
          json[i].categoria +
          "<h3><p>actividad:" +
          json[i].actividad +
          "<p><p>profe:" +
          json[i].profe +
          "<p><p>modo:" +
          json[i].modo +
          "<p><p>precio:" +
          json[i].precio +
          "<p><hr width=100% align=left><div>";
        html = actividadesHtml;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

traerActividades();

//aplicación de Spread
const Respaldo = { ...actividades };
/* con esta variable voy a implementar otra función para agregar actividades
a cargo de la secretaria del club */

document.getElementById("noSocio").innerHTML = "Todavía no sos socio del club?";
document.getElementById("noSocio2").innerHTML =
  "Dejanos tus datos para contactarte!";

function secretaria() {
  let noSocio = document.getElementById("noSocioNombre").value;
  let tel = document.getElementById("noSocioTel").value;

  localStorage.setItem("noSocio", noSocio);
  localStorage.setItem("tel", tel);
  const Toast = Swal.mixin({
    toast: true,
    position: "center-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Gracias! Pronto te contactaremos",
  });
}
let nombreOut;
function saludo() {
  let nombre = document.getElementById("nombre1").value;
  nombreOut = nombre;
  document.getElementById("socio").innerHTML =
    "Hola " +
    (nombreOut || "amigo/a,") +
    " vamos a buscar una actividad para vos! elegí ver el listado completo o buscar";
  localStorage.setItem("nombreOut", nombreOut);
}

function completo() {
  document.getElementById("completo").innerHTML =
    "Debajo verás el listado completo de todas las actividades del Club CODER";
  document.getElementById("actividades").innerHTML = html;
  document.getElementById("final").innerHTML =
    "¿Querés filtrar tu actividad? Tocá el botón BUSCAR MI ACTIVIDAD";
}

function pregunta() {
  document.getElementById("busc").innerHTML =
    "Vamos a filtrar tu actividad, marcá: 1 si querés presencial 2 si querés virtual 3 si buscás categoria infantil 4 si buscas categoría juvenil 5 si buscas categoría adulto";
}

function buscar() {
  let buscarNumero = document.getElementById("buscar").value;
  let dato;
  console.log(buscarNumero); //sale por consola para comprobar

  if (buscarNumero == 1) {
    dato = "presencial";
  } else if (buscarNumero == 2) {
    dato = "virtual";
  } else if (buscarNumero == 3) {
    dato = "infantil";
  } else if (buscarNumero == 4) {
    dato = "juvenil";
  } else if (buscarNumero == 5) {
    dato = "adulto";
  }
  let actividadesFiltradas = actividades.filter(function (actividad) {
    return actividad.modo == dato || actividad.categoria == dato;
  });

  let actividadesFiltradasHtml = "";
  for (let i = 0; i < actividadesFiltradas.length; i++) {
    actividadesFiltradasHtml =
      actividadesFiltradasHtml +
      "<div><h3> categoria:" +
      actividadesFiltradas[i].categoria +
      "<h3><p>actividad:" +
      actividadesFiltradas[i].actividad +
      "<p><p>profe:" +
      actividadesFiltradas[i].profe +
      "<p><p>modo:" +
      actividadesFiltradas[i].modo +
      "<p><p>precio:" +
      actividadesFiltradas[i].precio +
      "<p><hr width=100% align=left><div>";
  }
  document.getElementById("actividades").innerHTML = actividadesFiltradasHtml;
}

function check() {
  let final = document.getElementById("final1").value;
  localStorage.setItem("final", final);
}
let falta = localStorage.getItem("final");

document.getElementById("clave").innerHTML =
  "Reservado para la Secretaría (la clave es: club)";
let nombreVisita = localStorage.getItem("nombreOut");

function clave() {
  let clave1 = document.getElementById("clave1").value;
  clave1 == "club"
    ? claveSecretaria()
    : (document.getElementById("paraLlamar").innerHTML =
        "error - ingrese clave nuevamente");
}
function claveSecretaria() {
  (document.getElementById("paraLlamar").innerHTML =
    "Recordá llamar para asociar a : " + noSocio + " " + tel) &&
    (document.getElementById("ultimaVisita").innerHTML =
      "La última visita fue de " +
      nombreVisita +
      ". Nos dicen que falta la actividad " +
      falta);
}
