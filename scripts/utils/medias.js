async function getMedias() {

    const response = await fetch('../../data/photographers.json')
    const data = await response.json();

    return data.media
}