//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-NOTICIAS*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

async function cargarNoticias() {
    // Obtenemos el contenedor de las noticias #news-container
    const newsContainer = document.getElementById('news-container');
    try {
        // Hacemos una petición HTTP hacia el fichero news.json
        const response = await fetch("data/news.json")
        const noticias = await response.json()
        newsContainer.innerHTML = noticias.map(noticia => `
            <article class="noticia">
                <h3>${noticia.titulo}</h3>
                <p class="fecha">${noticia.fecha} - ${noticia.categoria}</p>
                <p>${noticia.contenido}</p>
            </article>
        `).join('');
    }
    catch(e) {
        console.log(e)
    }
}

// Generamos un evento para cuando la página (DOM) esté cargada
document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(cargarNoticias, 2000)
});