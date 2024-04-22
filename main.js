const libros = [
    { id: 1, titulo: "Odisea", autor: "Homero", precio: 5000, categoria: "Poesia"},
    { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", precio: 7400, categoria: "Novela Literaria"},
    { id: 3, titulo: "El código Da Vinci", autor: "Dan Brown", precio: 8200, categoria: "Novela Contemporánea"},
    { id: 4, titulo: "Alicia en el pais de las maravillas", autor: "Lewis Carroll", precio: 7600, categoria: "Juvenil"},
    { id: 5, titulo: "El Hobbit", autor: "J.R.R. Tolkien", precio: 22000, categoria: "Fantasia"},
    { id: 6, titulo: "El alquimista", autor: "Paulo Coelho", precio: 14000, categoria: "Novela Contemporánea"},
    { id: 7, titulo: "Orgullo y prejuicio", autor: "Jane Austen", precio: 8400, categoria: "Novela Literaria"},
    { id: 8, titulo: "El Gran Gatsby", autor: "Francis Scott Fitzgerald", precio: 3100, categoria: "Novela Literaria"},
    { id: 9, titulo: "Las aventuras de Pinocho", autor: "Carlos Collodi", precio: 12000, categoria: "Juvenil"},
    { id: 10, titulo: "Los 7 hábitos de la gente altamente efectiva", autor: "Stephen R. Covey", precio: 2400, categoria: "Empresa"}
];

function obtenerLibrosDelLocalStorage() {
    const librosEnLocalStorage = localStorage.getItem('librosCarrito');
    return librosEnLocalStorage ? JSON.parse(librosEnLocalStorage) : [];
}

function guardarLibrosEnLocalStorage(libros) {
    localStorage.setItem('librosCarrito', JSON.stringify(libros));
}

function mostrarLibrosEnCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');

    listaCarrito.innerHTML = '';
    let total = 0;

    const librosEnCarrito = obtenerLibrosDelLocalStorage();
    librosEnCarrito.forEach(libro => {
        const elementoCarrito = document.createElement('li');
        elementoCarrito.innerHTML = `${libro.titulo} - $${libro.precio} <button onclick="eliminarDelCarrito(${libro.id})">Eliminar</button>`;
        listaCarrito.appendChild(elementoCarrito);
        total += libro.precio;
    });

    totalCarrito.innerText = total.toFixed(2);
}

function mostrarLibros() {
    const listaLibros = document.getElementById('listaLibros');
    listaLibros.innerHTML = '';

    libros.forEach(libro => {
        const libroElemento = document.createElement('div');
        libroElemento.classList.add('libro');
        libroElemento.innerHTML = `
            <h2>${libro.titulo}</h2>
            <p>Autor: ${libro.autor}</p>
            <p>Categoria: ${libro.categoria}</p>
            <p>Precio: $${libro.precio}</p>
            <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
        `;
        listaLibros.appendChild(libroElemento);
    });

    mostrarLibrosEnCarrito(); 
}

function agregarAlCarrito(id) {
    const libro = libros.find(libro => libro.id === id);
    if (libro) {
        const librosEnCarrito = obtenerLibrosDelLocalStorage();
        librosEnCarrito.push(libro);
        guardarLibrosEnLocalStorage(librosEnCarrito);

        mostrarLibrosEnCarrito();

        let comprarCarrito = document.getElementById('comprarCarrito');
        comprarCarrito.onclick = () => mensaje();
    }
}

function eliminarDelCarrito(id) {
    const librosEnCarrito = obtenerLibrosDelLocalStorage();
    const librosActualizados = librosEnCarrito.filter(libro => libro.id !== id);
    guardarLibrosEnLocalStorage(librosActualizados);
    mostrarLibrosEnCarrito();
}

function mensaje() {
    alert(`¡Muchas gracias por comprar en nuestra página, nos vemos pronto!`);
}

mostrarLibros();
