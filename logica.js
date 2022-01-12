document.getElementById("formulario").addEventListener("submit",crear);

function crear(e){
nombreEscuela = document.getElementById("nomEsc").value;
direccion = document.getElementById("direction").value;
codigoPostal = document.getElementById("cp").value;
clave = document.getElementById("key").value;

let escuela = {
nombreEscuela,
direccion,
codigoPostal,
clave
}

if(localStorage.getItem("Datos") === null){
  let escuelas = [];
  escuelas.push(escuela);
  localStorage.setItem("Datos", JSON.stringify(escuelas));
}else{
   let escuelas = JSON.parse(localStorage.getItem("Datos"));
   escuelas.push(escuela);
   localStorage.setItem("Datos",JSON.stringify(escuelas));
}
leer();
document.getElementById("formulario").reset();
alert("La escuela ah sido ingresado correctamente");
e.preventDefault();
}

function leer(){
    let escuelas = JSON.parse(localStorage.getItem("Datos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < escuelas.length; i++){
       let nombreEscuela = escuelas[i].nombreEscuela
       let direccion = escuelas[i].direccion
       let codigoPostal = escuelas[i].codigoPostal
       let clave = escuelas[i].clave

       document.getElementById("tbody").innerHTML +=
      `<tr>
            <td>${nombreEscuela}</td>
            <td>${direccion}</td>
            <td>${codigoPostal}</td>
            <td>${clave}</td>
            <td> <button class="eliminar" onClick ="eliminar('${nombreEscuela}')"> Eliminar </button> </td>
            <td> <button class="editar" onClick ="editar('${nombreEscuela}')"> Editar </button> </td>
       </tr>`
    }
}

function editar(nombreEscuela){
let escuelas =JSON.parse(localStorage.getItem("Datos"));
for (let i=0; i < escuelas.length; i++){
    if(escuelas[i].nombreEscuela === nombreEscuela){
        document.getElementById("contenedor").innerHTML =
        `<tr>
        <td>
            <div>
                <h2> Editar escuela </h2>
              </div>
            <form id="formulario" autocomplete="off">
                <div>
                    <label for="nomEsc"> Nombre de la escuela: </label>
                    <br>
                    <input minlength="0" class="entries" type="text" name="nomEsc" id="nomEsc" placeholder="${escuelas[i].nombreEscuela}">
                </div>
                <div>
                    <label for="direction"> Direccion: </label>
                    <br>
                    <input minlength="0" class="entries" type="text" name="direction" required="" pattern="[a-z A-Z]+"  id="newdirection" placeholder="${escuelas[i].direccion}">
                </div>
                <div>
                    <label for="cp"> Codigo postal: </label>
                    <br>
                    <input minlength="0" class="entries" maxlength="5" type="text" name="cp" required="" id="newcp" placeholder="${escuelas[i].codigoPostal}">
                </div>
                <div>
                    <label for="key"> Clave: </label>
                    <br>
                    <input minlength="0" class="entries" type="text" name="key" required="" id="newkey" placeholder="${escuelas[i].clave}">
                    <button class="actualizar" type="submit" onClick ="actualizar('${i}')"> Actualizar </button>
                    <button class="cancelar" type="submit" onClick ="Vista()"> Cancelar </button>
                </div>
                
            </form>
            <td id="results">
                <table class="lista" id="Encabezados">
                    <thead>
                        <tr>
                            <th> Nombre de la escuela </th>
                            <th> Direccion </th>
                            <th> CP </th>
                            <th> Clave </th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        
                    </tbody>
                </table>
            </td>
    
        </td>
    </tr>`
    }
}
}

function actualizar(i){
  let escuelas = JSON.parse(localStorage.getItem("Datos"));
  escuelas[i].nombreEscuela = document.getElementById("newnomEsc").value;
  escuelas[i].direccion = document.getElementById("newdirection").value;
  escuelas[i].codigoPostal = document.getElementById("newcp").value;
  escuelas[i].clave = document.getElementById("newkey").value;
  if(escuelas[i].nombreEscuela ==""){
      alert("Ingrese un nombre antes de actualizar");
  }else{
    if(escuelas[i].direccion ==""){
      alert("Ingrese una direccion antes de actualizar");
    }else{
        if(escuelas[i].codigoPostal ==""){
            alert("Ingrese el codigo postal antes de actualizar");
        }else{
            if(escuelas[i].clave ==""){
                alert("Ingrese la clave antes de actualizar");
            }else{
            localStorage.setItem("Datos",JSON.stringify(escuelas));
            Vista();
            }
            
        }
        
    }

 
}

  
  localStorage.setItem("Datos", JSON.stringify(escuelas));
  Vista();

}

function eliminar(nombreEscuela){
  let escuelas = JSON.parse(localStorage.getItem("Datos"));
  for(let i=0; i<escuelas.length; i++){
      if(escuelas[i].nombreEscuela === nombreEscuela){
         escuelas.splice(i,1);
      }
  }
  localStorage.setItem("Datos", JSON.stringify(escuelas));
  leer();
}

function Vista(){
    document.getElementById("contenedor").innerHTML = 
    `<tr>
    <td>
        <div>
            <h2> Agregar Escuela </h2>
          </div>
        <form id="formulario" autocomplete="off">
            <div>
                <label for="nomEsc"> Nombre de la escuela: </label>
                <input type="text" name="CodigoAl" required="" pattern="[0-9]+" id="nomEsc" placeholder="Agregue solo números">
            </div>
            <div>
                <label for="direction"> Direccion: </label>
                <input type="text" name="direction" required="" pattern="[a-z A-Z]+"  id="direction" placeholder="Agregue solo letras">
            </div>
            <div>
                <label for="cp"> Codigo postal: </label>
                <input type="text" name="cp" required="" id="cp" placeholder="Se admiten números y letras, formato: 5to">
            </div>
            <div>
                <label for="key"> Clave: </label>
                <input type="text" name="key" required="" id="key" placeholder="Se admiten números y letras, formato: Ms5">
            </div>
            <div class="Botones">
                <input type="submit" value="Agregar" id="agregar">
                <input type="reset" value="Limpiar" id="limpiar">
            </div>
        </form>
        <td class="results">
            <table class="lista" id="Encabezados">
                <thead>
                    <tr>
                        <th> Nombre de la escuela: </th>
                        <th> Direccion: </th>
                        <th> CP: </th>
                        <th> Clave: </th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    
                </tbody>
            </table>
        </td>
    </td>
    </tr>`
    leer();
}

function limpiar(){
    document.getElementById('nomEsc').value = '';
    document.getElementById('direction').value = '';
    document.getElementById('cp').value = '';
    document.getElementById('key').value = '';
}
