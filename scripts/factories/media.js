function  mediaFactory(data) {

    const { id, photographerId, title, image, video, likes } = data;
    let author = null;
    window.photographers.forEach(photographer => {
        if (photographerId === photographer.id)
        {
            author = photographer.name
        }
    }) 
    
    const imgLink = `assets/images/${author}/${image}`;
    const vidLink = `assets/images/${author}/${video}`;
    
     function getMediaCardDOM() {
        
        
        const div__Medias = document.createElement( 'div' )
        div__Medias.setAttribute('class', 'media-item')
        div__Medias.setAttribute('role', 'dialog')
        
        //Création balise image si png ou jpg
        if (imgLink.split(".").pop() == 'jpg' || imgLink.split(".").pop() == 'png')
        {
            div__Medias.setAttribute('aria-label', 'photo')
            const img = document.createElement('img')
            img.setAttribute('role', 'image')
            img.setAttribute('src', imgLink)
            img.setAttribute('id', id)
            img.setAttribute('class', 'mediaImg')    
            img.setAttribute('alt', (title + ', close up view')) 
            img.setAttribute('tabindex', 0)
            img.addEventListener('keypress', function() {
                return displayLightbox(data)
            })        
            img.addEventListener('click', function (){
                return displayLightbox(data)
            });
            div__Medias.appendChild(img)
        }
        //Création de video si mp4
        if (vidLink.search('.mp4') !== -1)    
        {   
            const video = document.createElement('video')
            const source = document.createElement('source')
            video.setAttribute('role', 'video')
            video.setAttribute('type', 'video/mp4')
            video.setAttribute('src', vidLink)
            source.setAttribute('src', vidLink)
            video.setAttribute('id', id)
            video.setAttribute('class', 'mediaImg')    
            video.setAttribute('alt', ('video de ' + title)) 
            video.setAttribute('tabindex', 0)
            video.addEventListener('keypress', function() {
                return displayLightbox(data)
            })        
            video.addEventListener('click', function (){
                return displayLightbox(data)
            })
            div__Medias.appendChild(video)
            video.appendChild(source)
        }
                        
        const img_infos = document.createElement('div')
        img_infos.setAttribute('class', 'img_infos')
        div__Medias.appendChild(img_infos)

        const img_title = document.createElement('div')
        img_title.setAttribute('class', 'img_title')
        img_title.textContent = title
        img_infos.appendChild(img_title)
        // Likes icon
        const img_likes = document.createElement('div')
        img_likes.setAttribute('class', 'img_likes')
        img_likes.setAttribute('tabindex', 0)
        const empty_heart_icon = document.createElement('i')
        empty_heart_icon.setAttribute('class', 'fa-regular fa-heart')
        empty_heart_icon.setAttribute('tabindex', '0')
        // Add like
        empty_heart_icon.addEventListener('click', function() {
                       
            filled_heart_icon.style.display = 'flex'
            empty_heart_icon.style.display = 'none'
            let count_likes = likes + 1
            img_likes.textContent = count_likes
            document.querySelector('.likes').textContent = parseInt(document.querySelector('.likes').textContent) + 1         
        })
        empty_heart_icon.addEventListener('keydown', function(e) {
            let code = e.code
            if(code == 'Enter'){
                filled_heart_icon.style.display = 'flex'
                empty_heart_icon.style.display = 'none'
                let count_likes = likes + 1
                img_likes.textContent = count_likes
                document.querySelector('.likes').textContent = parseInt(document.querySelector('.likes').textContent) + 1
                filled_heart_icon.focus()                              
            } 

        })
        
        const filled_heart_icon = document.createElement('i')
        filled_heart_icon.setAttribute('class', 'fa-solid fa-heart')
        filled_heart_icon.setAttribute('tabindex', '0')
        //remove Like
        filled_heart_icon.addEventListener('click', function() {
                       
            filled_heart_icon.style.display = 'none'
            empty_heart_icon.style.display = 'flex' 
            img_likes.textContent = likes
            document.querySelector('.likes').textContent = parseInt(document.querySelector('.likes').textContent) - 1
            
        })
        filled_heart_icon.addEventListener('keydown', function(e) {
            let code = e.code
            if(code == 'Enter'){
                filled_heart_icon.style.display = 'none'
                empty_heart_icon.style.display = 'flex'
                img_likes.textContent = likes
                document.querySelector('.likes').textContent = parseInt(document.querySelector('.likes').textContent) - 1
                empty_heart_icon.focus()                           
            } 

        })
        filled_heart_icon.addEventListener('click', function() {
            filled_heart_icon.style.display = 'none'
            empty_heart_icon.style.display = 'flex'           
        })
        
        filled_heart_icon.addEventListener('keydown', function(e) {
            let code = e.code
            if(code == 'Enter'){
                empty_heart_icon.setAttribute('class', 'fa-regular fa-heart')           
                filled_heart_icon.style.opacity = '1'                
            } 

        })
        img_likes.textContent = likes 

        // Append
        img_infos.appendChild(img_likes)
        img_infos.appendChild(empty_heart_icon)
        img_infos.appendChild(filled_heart_icon)

        return (div__Medias)
    }

    function debugLikes () {
        console.log(data.likes)
    }
    
    return { data, getMediaCardDOM, debugLikes } 
}

