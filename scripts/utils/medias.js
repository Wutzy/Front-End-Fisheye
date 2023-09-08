async function getMedias() {

    const response = await fetch('https://wutzy.github.io/Front-End-Fisheye/data/photographers.json')
    const data = await response.json();

    return data.media
}