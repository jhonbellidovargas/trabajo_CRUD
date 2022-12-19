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
sectionUsers.classList.add("container", "mt-2");
resultado.append(sectionUsers);

//Agregar
const sectionAgregar = document.createElement("section");
sectionUsers.append(sectionAgregar);
const btnAgregar = document.createElement("button");
btnAgregar.classList.add("btn", "btn-primary");
btnAgregar.textContent = "Agregar";
sectionAgregar.append(btnAgregar);
btnAgregar.addEventListener("click", () => {
  ingresarUsuario();
  construirTabla();
});
//Tabla
const tablaUsers = document.createElement("table");
tablaUsers.classList.add("table", "table-striped");
sectionUsers.append(tablaUsers);
construirTabla();
function construirTabla() {
  tablaUsers.innerHTML = "";
  const thead = document.createElement("thead");
  tablaUsers.append(thead);
  construirEncabezadosUsers();
  construirCuerpoUsers();
}

//Modificar
const sectionModificar = document.createElement("section");
sectionUsers.append(sectionModificar);
const btnModificar = document.createElement("button");
btnModificar.classList.add("btn","btn-success");
btnModificar.textContent = "Modificar ✍️"
sectionModificar.append(btnModificar);
btnModificar.addEventListener("click", () => {
  //TODO: funcion modificar
  construirTabla();
});
//Borrar
const sectionEliminar = document.createElement("section");
sectionUsers.append(sectionEliminar);
const btnEliminar = document.createElement("button");
btnEliminar.classList.add("btn","btn-danger");
btnEliminar.textContent = "Eliminar 🚮"
sectionModificar.append(btnEliminar);
btnEliminar.addEventListener("click", () => {
  //TODO: funcion eliminar
});

function construirEncabezadosUsers() {
  const encabezados2 = document.createElement("thead");
  encabezados2.classList.add("thead-dark");
  const tr2 = document.createElement("tr");
  for (const key in users[0]) {
    const th = document.createElement("th");
    th.textContent = key;
    th.style.cursor = "pointer";
    if (key == "created_at") {
      th.textContent = `${key} ${reverse ? "↓" : "↑"}`;
      th.addEventListener("click", () => {
        ordenarPorFecha(users, reverse);
        tablaUsers.innerHTML = "";
        construirEncabezadosUsers();
        reverse = !reverse;
        construirCuerpoUsers();
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

const verificarDatos = (objeto) => {
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

const ingresarUsuario = () => {
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
  console.log(usuario);
  verificarDatos(usuario);
  users.push(usuario);
  console.log(users);
};
const ordenarPorFecha = (arreglo, reverse) => {
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

const ordenarPorAtributo = (atributo,reverse) => {
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
