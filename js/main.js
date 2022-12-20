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

let reverseCreated = false;
let reverseNombre = false;
let reverseApellido = false;
let reverseEdad = false;
let reverseProfesion = false;
let reverseId = false;
let reverseModified = false;

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
const inputFiltrarMes = document.createElement("input");
inputFiltrarMes.classList.add("form-control", "me-2");
inputFiltrarMes.setAttribute("type", "number");
inputFiltrarMes.setAttribute("min", "1");
inputFiltrarMes.setAttribute("max", "12");
inputFiltrarMes.placeholder = "Mes";
sectionFiltrar.append(inputFiltrarMes);
const inputFiltrarAnio = document.createElement("input");
inputFiltrarAnio.classList.add("form-control", "me-2");
inputFiltrarAnio.setAttribute("type", "number");
inputFiltrarAnio.setAttribute("min", "2020");
const anioActual = new Date().getFullYear();
inputFiltrarAnio.setAttribute("max", anioActual);
inputFiltrarAnio.placeholder = "Año";
sectionFiltrar.append(inputFiltrarAnio);

const btnFiltrar = document.createElement("button");
btnFiltrar.classList.add("btn", "btn-primary");
btnFiltrar.textContent = "Filtrar";
sectionFiltrar.append(btnFiltrar);
btnFiltrar.addEventListener("click", () => {
  const mes = inputFiltrarMes.value;
  const anio = inputFiltrarAnio.value;
  usersFiltrados = filtrarPorFecha(users, mes, anio);
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
btnModificar.innerHTML = `Modificar registro <i class="fas fa-edit"></i>`;
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
btnEliminar.innerHTML = `Eliminar registro <i class="fas fa-trash-alt"></i>`;
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
    if (key == "id") {
      th.textContent = `${key.toUpperCase()} ${reverseId ? "↑" : "↓"}`;
      th.addEventListener("click", () => {
        reverseId = !reverseId;
        ordenarPorAtributo(key, reverseId);
        construirTabla();
      });
    }
    if (key == "nombre") {
      th.textContent = `${key.toUpperCase()} ${reverseNombre ? "↑" : "↓"}`;
      th.addEventListener("click", () => {
        reverseNombre = !reverseNombre;
        ordenarPorAtributo(key, reverseNombre);
        construirTabla();
      });
    }
    if (key == "apellido") {
      th.textContent = `${key.toUpperCase()} ${reverseApellido ? "↑" : "↓"}`;
      th.addEventListener("click", () => {
        reverseApellido = !reverseApellido;
        ordenarPorAtributo(key, reverseApellido);
        construirTabla();
      });
    }
    if (key == "edad") {
      th.textContent = `${key.toUpperCase()} ${reverseEdad ? "↑" : "↓"}`;
      th.addEventListener("click", () => {
        reverseEdad = !reverseEdad;
        ordenarPorAtributo(key, reverseEdad);
        construirTabla();
      });
    }
    if (key == "profesion") {
      th.textContent = `${key.toUpperCase()} ${reverseProfesion ? "↑" : "↓"}`;
      th.addEventListener("click", () => {
        reverseProfesion = !reverseProfesion;
        ordenarPorAtributo(key, reverseProfesion);
        construirTabla();
      });
    }
    if (key == "created_at") {
      th.textContent = `${key.toUpperCase()} ${reverseCreated ? "↓" : "↑"}`;
      th.addEventListener("click", () => {
        reverseCreated = !reverseCreated;
        ordenarPorFecha(users, reverseCreated, key);
        construirTabla();
      });
    }
    if (key == "modified_at") {
      th.textContent = `${key.toUpperCase()} ${reverseModified ? "↓" : "↑"}`;
      th.addEventListener("click", () => {
        reverseModified = !reverseModified;
        ordenarPorFecha(users, reverseModified, key);
        construirTabla();
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
  }
};

function ingresarUsuario () {
  let nombre = prompt('Nombre: ');
  if (nombre === null || nombre==="") {
    return;
  }
  let apellido = prompt('Apellido: ');
  if (apellido === null || apellido === "") {
    return;
  }
  let edad = prompt('Edad: ')
  if (edad === null || edad === "") {
    return;
  } else if(isNaN(edad)==true){
    alert('es un no numero');
    edad = prompt('Por favor, ingrese un número como edad: ')
  }
  let profesion = prompt('Profesión: ')
  if (profesion === null || profesion === "") {
    return;
  }
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

function ordenarPorFecha (arreglo, reverse, atributo) {
  if (reverse) {
    arreglo.sort((a, b) => {
      return new Date(a[atributo]) - new Date(b[atributo]);
    });
  } else {
    arreglo.sort((a, b) => {
      return new Date(b[atributo]) - new Date(a[atributo]);
    });
  }
};

function ordenarPorAtributo(atributo,reverse) {
  if (typeof users[0][atributo] === "string") {
    if (reverse === true) {
      return users.sort((a, b) => {
        return a[atributo].localeCompare(b[atributo]);
      });
    } else {
      return users.sort((a, b) => {
        return b[atributo].localeCompare(a[atributo]);
      });
    }
  } else if (typeof users[0][atributo] === "number") {
    if (reverse===true){
      return users.sort((a, b) => {
        return b[atributo] - a[atributo];
      });
    } else {  
      return users.sort((a, b) => {
        return a[atributo] - b[atributo];
      });
    }
  } else {
    return "Por favor utiliza un atributo válido";
  }
};

function modificarUsuarios () {
  let idIngresado = prompt("Ingresa el Id");
  if (idIngresado === null || idIngresado==="") {
    return;
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
      } else if (isNaN(edad)==true){
        alert('es un no numero');
        edad = prompt(`Edad: ${user.edad}. Por favor, ingrese un número como edad: `)
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
  if (id === "" || id === null) {
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

function filtrarPorFecha (arreglo, mes, anio) {
  let usuariosFiltrados = arreglo.filter((usuario) => {
    let fecha = new Date(usuario.created_at);
    return fecha.getMonth() + 1 == mes && fecha.getFullYear() == anio;
  });
  return usuariosFiltrados;
};




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
