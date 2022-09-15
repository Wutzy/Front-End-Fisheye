async function displayLightbox(data) {
    const { photographerId, image, video, title } = data;
    const lightbox_img = document.querySelector('.lightbox_main-image')
    const lightbox_video = document.querySelector('.lightbox-video')

    const photographers = await getPhotographers();
    let author_photo = null;
    photographers.forEach(photographer => {
        if (photographerId === photographer.id)
        {
            author_photo = photographer.name

        }
    }) 

    const imgLink = `assets/images/${author_photo}/${image}`;
    const vidLink = `assets/images/${author_photo}/${video}`;
    const lightbox = document.querySelector('#lightbox') 
    lightbox.setAttribute('tabindex', 0) 
    lightbox.addEventListener('keydown', function(e) 
    {
        let code = e.code
        {                                                           
            if(code == 'ArrowLeft'){
                
                return previousLightbox()
            } 
            if(code == 'ArrowRight'){
                
                return nextLightbox()
            } 
            if(code == 'Escape'){                
                return closeLightbox()
            }               
        }
    })   
    lightbox.style.display = 'flex' 

    //Si le media est une video
    if (vidLink.search('.mp4') !== -1){
        lightbox_img.setAttribute('src', '')
        lightbox_video.style.display = 'flex'
        lightbox_video.setAttribute('alt', title)
        lightbox_video.setAttribute('controls', '')
        lightbox_video.setAttribute('src', vidLink)
        
    }else {   
        lightbox_video.setAttribute('src', '')
        lightbox_img.style.display = 'flex'    
        lightbox_img.setAttribute('src', imgLink)
        lightbox_img.setAttribute('alt', title)
    }
    document.querySelector('header').style.display = 'none'
    document.querySelector('main').style.display = 'none'
    document.querySelector('.statsPhotographer').style.display = 'none'   
    document.querySelector('.lightbox_img_info').textContent = title  
    return lightbox.focus()  
}

async function closeLightbox() 
{
    const lightbox = document.querySelector('.lightbox')
    lightbox.style.display = 'none'
    const lightbox_video = document.querySelector('.lightbox-video')
    lightbox_video.style.display = 'none'
    const lightbox_img = document.querySelector('.lightbox_main-image')
    lightbox_img.style.display = 'none'
    document.querySelector('header').style.display = 'flex'
    document.querySelector('main').style.display = 'block'
    document.querySelector('.statsPhotographer').style.display = 'flex'
    document.querySelector('.contact_button').focus()
}

async function nextLightbox() {
    
    const lightbox_video = document.querySelector('.lightbox-video')
    const lightbox_img = document.querySelector('.lightbox_main-image')
    const video_src = lightbox_video.getAttribute('src')
    let selected_element = null
    let next_element = null
    let next_element_title = null

    const all_elements_media = document.querySelectorAll('.mediaImg')
    all_elements_media.forEach(element_media => {        
        if (element_media.getAttribute('src') == video_src || next_element == null) 
        {   
            selected_element = element_media           
            next_element = selected_element.parentElement.nextElementSibling.firstChild.getAttribute('src')
            next_element_title = selected_element.parentElement.nextElementSibling.firstChild.getAttribute('alt')
                   
        }else if ((element_media.getAttribute('src') == lightbox_img.getAttribute('src')))
        {   
            lightbox_video.setAttribute('src', '')
            selected_element = element_media            
            next_element = selected_element.parentElement.nextElementSibling.firstChild.getAttribute('src')
            next_element_title = selected_element.parentElement.nextElementSibling.firstChild.getAttribute('alt')                 
        }
    })
    
    // Cas où le prochain media est une video                 
    if (next_element.search('.mp4') !== -1) {              
    lightbox_video.style.display = 'flex'
    lightbox_video.setAttribute('src', next_element)  
    lightbox_video.setAttribute('controls', '')               
    lightbox_img.style.display = 'none'     
    document.querySelector('.lightbox_img_info').textContent = next_element_title
    } 
    // Cas où  le prochain media est une image
    else { 
                     
        lightbox_video.style.display = 'none'               
        lightbox_img.style.display = 'flex'  
        lightbox_img.setAttribute('src', next_element)  
        document.querySelector('.lightbox_img_info').textContent = next_element_title
    } 
           
}

async function previousLightbox() {
    
    const lightbox_video = document.querySelector('.lightbox-video')
    const lightbox_img = document.querySelector('.lightbox_main-image')
    const video_src = lightbox_video.getAttribute('src')
    let selected_element = null
    let previous_element = null
    let previous_element_title = null

    // Identification du média présent sur la lightbox
    const all_elements_media = document.querySelectorAll('.mediaImg')
    all_elements_media.forEach(element_media => {        
        if (element_media.getAttribute('src') == video_src) 
        {   
            selected_element = element_media           
            previous_element = selected_element.parentElement.previousElementSibling.firstChild.getAttribute('src')
            previous_element_title = selected_element.parentElement.previousElementSibling.firstChild.getAttribute('alt')     
                   
        }else if (element_media.getAttribute('src') == lightbox_img.getAttribute('src'))
        {   
            lightbox_video.setAttribute('src', '')
            selected_element = element_media          
            previous_element = selected_element.parentElement.previousElementSibling.firstChild.getAttribute('src')
            previous_element_title = selected_element.parentElement.previousElementSibling.firstChild.getAttribute('alt')     
        }

    })
    
    // Cas où le précédent media est une video                 
    if (previous_element.search('.mp4') !== -1) {  
    lightbox_img.setAttribute('src', '')             
    lightbox_video.style.display = 'flex'
    lightbox_video.setAttribute('src', previous_element)  
    lightbox_video.setAttribute('controls', '')               
    lightbox_img.style.display = 'none'     
    document.querySelector('.lightbox_img_info').textContent = previous_element_title
    } 
    // Cas où  le précédent media est une image
    else {        
        lightbox_video.setAttribute('src', '')      
        lightbox_video.style.display = 'none'               
        lightbox_img.style.display = 'flex'  
        lightbox_img.setAttribute('src', previous_element)  
        document.querySelector('.lightbox_img_info').textContent = previous_element_title
    }
}


