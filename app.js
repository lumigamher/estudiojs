//optener tareas 
function obtenerTareas(){
    fetch('http://localhost:3000/tareas') //me hace una solicitud get a la url 
        .then(respuesta=>respuesta.json())//convertimos las respuesta a json
        .then(datos=>{
            const contenedorTareas = document.getElementById('tareas');// traemos el elemento div con id tareas del dom 
            contenedorTareas.innerHTML=''; //limpiar el contenido existente

            // recorrer las tareas y crear elemetos en el dom
            datos.forEach(tarea => {
                const tareaElemento = document.createElement('div');
                const tituloElemento = document.createElement('span');
                tituloElemento.textContent = tarea.titulo;
                tareaElemento.appendChild(tituloElemento);

                const actualizarBoton = document.createElement('button');
                actualizarBoton.textContent='Actualizar';
                actualizarBoton.addEventListener('click', ()=>actualizarTarea(tarea.id));
                tareaElemento.appendChild(actualizarBoton);

                const eliminarBoton = document.createElement('button');
                eliminarBoton.textContent='eliminar';
                eliminarBoton.addEventListener('click', ()=>eliminarTarea(tarea.id));
                tareaElemento.appendChild(eliminarBoton);

                contenedorTareas.appendChild(tareaElemento);
            });
        })
        .catch(error=>console.error('Error:',error));
}

function eliminarTarea(idTarea) {
    if (confirm('¡estas seguro de eliminar esta tarea?')) {
        fetch(`http://localhost:3000/tareas/${idTarea}`,{
            method: 'DELETE'
        })
        .then(respuesta=>{
            if (respuesta.ok) {
                console.log('tarea eliminada');
                obtenerTareas();
            } else {
                console.error('Error al eliminar tarea');
            }
        })
        .catch(error=>console.error('Error:', error));
    }
}

function actualizarTarea(idTarea){
    const nuevaTarea = prompt('Ingresar el nuevo titulo de la tarea');

    if (nuevaTarea !== null && nuevaTarea.trim() !== '') {
        fetch(`http://localhost:3000/tareas/${idTarea}`,{
            method:'PUT',
            headers: {
                'Content-type': 'aplication/json'
            },
            body: JSON.stringify({titulo: nuevaTarea, completado: false})
        })
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            console.log('Tarea Actualizada:',datos);
            obtenerTareas(); // actualizar la lista de tareas en el dom
        })
        .catch(error=>console.error('Error:',error));
    }
}

function agregarTarea(evento) {
    evento.preventDefault(); // evitar que ek formulario se comporte de forma predeterminada
    const nuevaTarea = document.getElementById('nuevaTarea').value.trim(); //me traigo el input y con trim limpio el valor de la entrada detxto
    if (nuevaTarea!==''){
        fetch('http://localhost:3000/tareas',{
            method:'POST',
            headers: {
                'Content-type': 'aplication/json'
            },
            body: JSON.stringify({titulo: nuevaTarea, completado: false})
        })
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            console.log('Tarea agregada:',datos);
            obtenerTareas(); // actualizar la lista de tareas en el dom
            document.getElementById('nuevaTarea').value=''
        })
        .catch(error=>console.error('Error:',error));
    }
}
// agregar el envet listener al formulario 
const formularioTarea = document. getElementById('formularioTarea');
formularioTarea.addEventListener('submit', agregarTarea);



window.addEventListener('load',obtenerTareas);