const resultado = document.getElementById("root");
let users = [
  {id: 1, nombre: "Andres", apellido: "Pacheco", edad: 38, profesion: "developer", created_at: "2022-09-26T06:25:21.118Z"},
  {id: 2, nombre: "Andrea", apellido: "Sanchez", edad: 25, profesion: "profesor", created_at: "2022-04-18T14:14:32.879Z"},
  {id: 3, nombre: "Julia", apellido: "Ochoa", edad: 32, profesion: "musico", created_at: "2021-12-14T11:53:38.279Z"},
  {id: 4, nombre: "Samuel", apellido: "Martinez", edad: 29, profesion: "programador", created_at: "2022-01-26T03:31:15.202Z"},
  {id: 5, nombre: "Roberto", apellido: "Mattos", edad: 40, profesion: "chef", created_at: "2022-07-27T02:06:22.760Z"},
  {id: 6, nombre: "Mercedes", apellido: "Sanchez", edad: 35, profesion: "veterinario", created_at: "2022-05-01T22:06:35.864Z"},
]
let usersFiltrados = [];

var reverse = false;
const sectionUsers = document.createElement("section");
sectionUsers.classList.add("container");
resultado.append(sectionUsers);

//Header
const header = document.createElement("header");
header.classList.add("p-3", "rounded", "row", "d-flex", "justify-content-center");
sectionUsers.append(header);
const h1 = document.createElement("h1");
h1.classList.add("text-center");
h1.textContent = "CRUD - Usuarios";
header.append(h1);

//Menu
const sectionSuperior = document.createElement("section");
sectionSuperior.classList.add("p-3", "bg-dark", "rounded", "text-white", "row", "d-flex", "justify-content-between", "my-2");
sectionUsers.append(sectionSuperior);
//Filtrar
const sectionFiltrar = document.createElement("section");
sectionFiltrar.classList.add("container", "col-12", "col-md-6", "d-flex", "justify-content-start");
sectionSuperior.append(sectionFiltrar);
const inputFiltrar = document.createElement("input");
inputFiltrar.classList.add("form-control", "me-2");
inputFiltrar.placeholder = "Buscar por nombre";
sectionFiltrar.append(inputFiltrar);
inputFiltrar.addEventListener("keyup", () => {
  usersFiltrados = filtrarPorNombre(users, inputFiltrar.value);
  construirTabla();
});

//Agregar
const sectionAgregar = document.createElement("section");
sectionAgregar.classList.add("container", "col-12", "col-md-6", "d-flex", "justify-content-end");
sectionSuperior.append(sectionAgregar);
const btnAgregar = document.createElement("button");
btnAgregar.classList.add("btn", "btn-primary");
btnAgregar.innerHTML = `Agregar <i class="fas fa-plus"></i>`;
sectionAgregar.append(btnAgregar);
btnAgregar.addEventListener("click", () => {
  ingresarUsuario();
  construirTabla();
});
//Tabla
const tablaUsers = document.createElement("table");
tablaUsers.classList.add("table", "table-striped", "table-bordered", "table-responsive");
sectionUsers.append(tablaUsers);
construirTabla();
function construirTabla() { 
  tablaUsers.innerHTML = "";
  const thead = document.createElement("thead");
  tablaUsers.append(thead);
  construirEncabezadosUsers();
  construirCuerpoUsers();
}

//Seccion final
const sectionInferior = document.createElement("section");
sectionInferior.classList.add("p-4", "rounded", "text-white", "row", "d-flex", "justify-content-center", "my-4");
sectionUsers.append(sectionInferior);
//Modificar
const sectionModificar = document.createElement("section");
sectionModificar.classList.add("container", "col-12", "col-md-6", "d-flex", "justify-content-end");
sectionInferior.append(sectionModificar);
const btnModificar = document.createElement("button");
btnModificar.classList.add("btn","btn-success", "mx-2");
btnModificar.innerHTML = `Modificar <i class="fas fa-edit"></i>`;
sectionModificar.append(btnModificar);
btnModificar.addEventListener("click", () => {
  modificarUsuarios();
  construirTabla();
});
//Borrar
const sectionEliminar = document.createElement("section");
sectionEliminar.classList.add("container", "col-12", "col-md-6", "d-flex", "justify-content-start");
sectionInferior.append(sectionEliminar);
const btnEliminar = document.createElement("button");
btnEliminar.classList.add("btn","btn-danger", "mx-2");
btnEliminar.innerHTML = `Eliminar <i class="fas fa-trash-alt"></i>`;
sectionEliminar.append(btnEliminar);
btnEliminar.addEventListener("click", () => {
  deleteRecord();
  construirTabla();
});

function construirEncabezadosUsers() {
  const encabezados2 = document.createElement("thead");
  encabezados2.classList.add("bg-dark", "text-white");
  const tr2 = document.createElement("tr");
  //verificamos si alhuno de los objetos tiene la propiedad modified_at
  let indexofModified = 0;
  for (const index in users) {
    if (users[index].hasOwnProperty("modified_at")) {
      indexofModified = index;
      break;
    }
  }
  for (const key in users[indexofModified]) {
    const th = document.createElement("th");
    th.textContent = key.toUpperCase();
    th.style.cursor = "pointer";
    if (key == "created_at") {
      th.textContent = `${key.toUpperCase()} ${reverse ? "↓" : "↑"}`;
      th.addEventListener("click", () => {
        ordenarPorFecha(users, reverse);
        construirTabla();
        reverse = !reverse;
      });
    } 
    tr2.append(th);
  }
  encabezados2.append(tr2);
  tablaUsers.append(encabezados2);
}

function construirCuerpoUsers() {
  const cuerpo = document.createElement("tbody");
  if (usersFiltrados.length > 0) {
    for (const index in usersFiltrados) {
      const tr = document.createElement("tr");
      for (const key in usersFiltrados[index]) {
        const td = document.createElement("td");
        td.textContent = usersFiltrados[index][key];
        tr.append(td);
      }
      cuerpo.append(tr);
    }
    tablaUsers.append(cuerpo);
  } else {
    for (const index in users) {
      const tr = document.createElement("tr");
      for (const key in users[index]) {
        const td = document.createElement("td");
        td.textContent = users[index][key];
        tr.append(td);
      }
      cuerpo.append(tr);
    }
    tablaUsers.append(cuerpo);
  }
}

function verificarDatos(objeto) {
  let datosFaltantes = [];
  for (const key in objeto) {
    if (key === "id") {
      objeto[key] = users.length + 1;
    }
    if (objeto[key] === "" || objeto[key] === undefined) {
      datosFaltantes.push(key);
    }
  }
  if (datosFaltantes.length > 0) {
    datosFaltantes.forEach((dato) => {
      let datoIngresado = prompt(`Ingrese el dato faltante: ${dato}`);
      if (datoIngresado === "") {
        alert("No puede ingresar un dato vacio");
      } else {
        objeto[dato] = datoIngresado;
      }
    });
  } else {
    alert("Todos los datos estan completos");
  }
};

function ingresarUsuario () {
  let nombre = prompt('Nombre: ')
  let apellido = prompt('Apellido: ')
  let edad = prompt('Edad: ')
  let profesion = prompt('Profesión: ')
  let fecha = new Date()
  let usuario = {
    id: users.length + 1,
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    profesion: profesion,
    created_at: fecha.toISOString()
  };
  verificarDatos(usuario);
  users.push(usuario);
};

function ordenarPorFecha (arreglo, reverse) {
  if (reverse) {
    arreglo.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
  } else {
    arreglo.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }
};

function ordenarPorAtributo(atributo,reverse) {
  if (typeof pokemons[0][atributo] === "string") {
    if (reverse === true) {
      return pokemons.sort((a, b) => {
        return a[atributo].localeCompare(b[atributo]);
      });
    } else {
      return pokemons.sort((a, b) => {
        return b[atributo].localeCompare(a[atributo]);
      });
    }
  } else if (typeof pokemons[0][atributo] === "number") {
    if (reverse===true){
      return pokemons.sort((a, b) => {
        return b[atributo] - a[atributo];
      });
    } else {  
      return pokemons.sort((a, b) => {
        return a[atributo] - b[atributo];
      });
    }
  } else {
    return "Por favor utiliza un atributo válido";
  }
};

// filtro
// const sectionFiltro = document.createElement("section");
// sectionUsers.append(sectionFiltro);
// const inputMes = document.createElement("input");
// inputMes.setAttribute("type", "number");
// inputMes.setAttribute("placeholder", "Mes");
// inputMes.setAttribute("min", "1");
// inputMes.setAttribute("max", "12");
// sectionFiltro.append(inputMes);
// const inputAnio = document.createElement("input");
// inputAnio.setAttribute("type", "number");
// inputAnio.setAttribute("placeholder", "Año");
// inputAnio.setAttribute("min", "2021");
// inputAnio.setAttribute("max", "2022");
// sectionFiltro.append(inputAnio);
// const btnFiltrar = document.createElement("button");
// btnFiltrar.classList.add("btn", "btn-primary");
// btnFiltrar.textContent = "Filtrar";
// sectionFiltro.append(btnFiltrar);
// btnFiltrar.addEventListener("click", () => {
//   const mes = inputMes.value;
//   const anio = inputAnio.value;
//   usersFiltrados = filtrarPorFecha(users, mes, anio);
//   tablaUsers.innerHTML = "";
//   construirEncabezadosUsers();
//   construirCuerpoUsers();
// });

function modificarUsuarios () {
  let idIngresado = prompt("Ingresa el Id");
  if (idIngresado === "") {
    alert("No puede ingresar un dato vacio");
  } else {
    let user = users.find((user) => user.id == idIngresado);
    if (user) {
      let nombre = prompt(`Nombre: ${user.nombre}`);
      if (nombre === "") {
        nombre = user.nombre;
      };
      let apellido = prompt(`Apellido: ${user.apellido}`);
      if (apellido === "") {
        apellido = user.apellido;
      }
      let edad = prompt(`Edad: ${user.edad}`);
      if (edad === "") {
        edad = user.edad;
      }
      let profesion = prompt(`Profesión: ${user.profesion}`);
      if (profesion === "") {
        profesion = user.profesion;
      }
      user.nombre = nombre;
      user.apellido = apellido;
      user.edad = edad;
      user.profesion = profesion;
      user.modified_at = new Date().toISOString();
    }
  }
};

function deleteRecord() {
  // Pide al usuario que ingrese el ID del registro a borrar
  const id = prompt("Ingresa el ID del registro que deseas borrar:");
  if (id === "") {
    alert("No puedes ingresar un dato vacío");
    return;
  } else {
    // Busca el registro en la matriz de usuarios
    const user = users.find((user) => user.id == id);
    // Si el usuario no existe, se muestra un mensaje de error
    if (!user) {
      alert("El usuario no existe");
      return;
    } else {
      // Verifica si el usuario está seguro de borrar el registro
      const confirmDelete = prompt("¿Estás seguro de que deseas borrar este registro? Si/No");
      // Si el usuario confirma que quiere borrar el registro, se busca el registro en la matriz de usuarios
      // y se elimina
      if (confirmDelete === "Si" || confirmDelete === "si") {
        const index = users.indexOf(user);
        users.splice(index, 1);
      }
    }
  }
}




// CREATE
// El admin debe poder crear un nuevo registro de usuario utilizando la funcion 10. (Pueden utilizar un boton que diga "Crear Usuario")
// READ
// El admin debe poder visualizar en pantalla los registros que estan siendo creados.
// UPDATE
// El admin, al presionar un boton: "Modificar registro" en la parte inferior de la lista de registros, debe
// ver un prompt que le pida que ingrese el id del registro que desea modificar, en caso no ingrese ninguno,
// debe volver a la pagina inicial. Si elige modificar alguno, debe aparecer nuevamente el prompt del ejercicio 10
// OJO: Cuando el admin modifique el registro, no se debe modificar la fecha de creacion, en su lugar debe aparecer
// un nuevo campo de fecha de modificacion.
// DELETE
// El admin, al presionar un boton: "Borrar registro" en la parte inferior de la lista de registros, debe ver
// un prompt que le pida ingresar el id del registro que desea borrar. Al dar click, debe aparecer un prompt
// que le pregunte: "Esta usted seguro? Si/No" y al escribir Si, deberia borrarlo. En cualquier otro caso
// deberia volver a la pagina inicial sin que se haya borrado ningun registro.
 
// ADICIONAL1: Añadir a la tabla la funcionalidad de ordenar los registros al hacer click en los encabezados
// (como en el caso de Pokemon). Sin embargo, al momento de hacer click nuevamente en el encabezado, los datos
// deben ordenarse de manera inversa. Ejemplo: Si al hacer click se ordenan de menor a mayor, al volver a hacer
// click deben ordenarse de mayor a menor.
 
// OPCIONAL: Crear un selector que permita filtrar los datos por fecha.
 
 
// faltan las funciones de ordenar y filtrar para las adicionales, tambien eliminar y modificar segun las indicaciones
