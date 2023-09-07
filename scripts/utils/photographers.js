async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('../../data/photographers.json')
    const data = await response.json();

    // et bien retourner le tableau photographers seulement une fois
    return data.photographers
}





