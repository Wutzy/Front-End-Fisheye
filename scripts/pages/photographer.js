//Mettre le code JavaScript lié à la page photographer.html
const header_logo = document.querySelector('header > .logo')
header_logo.setAttribute('role', 'image')
header_logo.setAttribute('alt', 'logo de Fisheye')
const button_contact = document.querySelector('.contact_button')
button_contact.setAttribute('role', 'button')
button_contact.setAttribute('arial-label', 'bouton contact')


function customCreateElement (element, attribute, attribute_valor, content)
{
    const created_element = document.createElement(element)
    created_element.setAttribute(attribute, attribute_valor)
    created_element.textContent = content   
    return created_element     
}

function displayFilters ()
{
    document.querySelector('.filter-option:nth-child(2)').style.display = 'flex'
    document.querySelector('.filter-option:nth-child(3)').style.display = 'flex'
    document.querySelector('.expend_icon').style.opacity = '0'
    document.querySelector('.short_icon').style.opacity = '1'
}

function hideFilters() 
{
    document.querySelector('.filter-option:nth-child(2)').style.display = 'none'
    document.querySelector('.filter-option:nth-child(3)').style.display = 'none'
    document.querySelector('.expend_icon').style.opacity = '1'
    document.querySelector('.short_icon').style.opacity = '0'
}

async function displayData(dataPhotographer)  {
    
    const header_logo = document.querySelector('.logo')
    header_logo.setAttribute('alt', 'Fisheye Home page')
    header_logo.setAttribute('class', 'logo clickable')
    header_logo.addEventListener('click', function() {
        window.location = document.referrer
    })
    const photographersSection = document.querySelector(".photograph-header")
    photographersSection.setAttribute('aria-label', 'photohraph-info-navigation')
    const header = document.querySelector("header")
    header.setAttribute('role', 'banner')         
    const main = document.querySelector('#main')
    photographersSection.style.display = "flex"
    const h1 = document.createElement('h1')
    h1.setAttribute('class', 'photohraphSection_title')
       
    const img = document.createElement('img');
    const picture = `assets/photographers/${dataPhotographer.portrait}`;
    img.setAttribute('src', picture);
    img.setAttribute('alt', dataPhotographer.name);

   
    const div__photo__section = document.createElement('div')
    div__photo__section.setAttribute('class', 'photos-section')

    // Creation filter select
    const div__filters = document.createElement('div')
    div__filters.setAttribute('class', 'filters')
    div__filters.setAttribute('role', 'sort')
    const label = customCreateElement('label','for', 'filter-select', 'Trier par: ')
    const div_select = document.createElement('div')
    div_select.setAttribute('class', 'filter-select filter-expend')
    div_select.setAttribute('name', 'filters')
    
    // Option by likes
    const div_select_like = document.createElement('div')
    div_select_like.setAttribute('class', 'filter-like filter-option')
    div_select_like.textContent = 'Popularité'
    div_select_like.setAttribute('tabindex', '0')

    //Expend icon
    const img_menu_extend = document.createElement('i')
    img_menu_extend.setAttribute('class', 'expend_icon fa-solid fa-angle-down')
    img_menu_extend.setAttribute('tabindex', '0')
    img_menu_extend.addEventListener('keydown', function(e) {
        let code = e.code
        if(code == 'Enter')
        {
            displayFilters()
            return div_select_like.focus()
        }    
    }) 
    // Short icon
    const img_menu_short = document.createElement('i')
    img_menu_short.setAttribute('class', 'expend_icon short_icon fa-solid fa-angle-down')
    img_menu_short.addEventListener('keydown', function(e) {
        let code = e.code
        if(code == 'Enter'){
            hideFilters()
            return img_menu_extend.focus()
        }  
    }) 
    // Option by name
    const div_select_name = document.createElement('div')
    div_select_name.setAttribute('class', 'filter-name filter-option')
    div_select_name.setAttribute('tabindex', '0')
    div_select_name.textContent = 'Titre'
    
    // Option by date
    const div_select_date = document.createElement('div')
    div_select_date.setAttribute('class', 'filter-date filter-option')
    div_select_date.setAttribute('tabindex', '0')
    div_select_date.textContent = 'Date'
    

    // Rectangle like + price
    const div_stat_photographer = document.createElement('div')
    div_stat_photographer.setAttribute('class', 'statsPhotographer')
    const div_stat_likes = document.createElement('div')
    div_stat_likes.setAttribute('class', 'likes')
    const div_stat_price = document.createElement('div')
    div_stat_price.setAttribute('class', 'price')
    div_stat_price.textContent = dataPhotographer.price + ' € / jour'
    document.querySelector('body').append(div_stat_photographer)

 

    // Section top: Photographer infos
    const div__intro = document.createElement('div')
    div__intro.setAttribute('class', 'photographer_infos')
    // Name
    const div__intro__name = document.createElement('h1')
    div__intro__name.textContent = dataPhotographer.name
    // Localisation
    const div__intro__localisation = document.createElement('div')
    div__intro__localisation.setAttribute('class', 'photograph-localisation')
    div__intro__localisation.textContent = dataPhotographer.city + ', ' + dataPhotographer.country
    // Tagline
    const div__intro__tagline = document.createElement('div')
    div__intro__tagline.setAttribute('class', 'photograph-tagline')
    div__intro__tagline.textContent = dataPhotographer.tagline
    // Append Phototagrapher's infos
    div__intro.appendChild(div__intro__name)
    div__intro.appendChild(div__intro__localisation)  
    div__intro.appendChild(div__intro__tagline)
    photographersSection.prepend(div__intro)
    photographersSection.appendChild(img)
    main.appendChild(div__filters)
    main.appendChild(div__photo__section)
    div__filters.appendChild(label)
    div__filters.appendChild(div_select)
    div_select.appendChild(div_select_like)
    div_select.appendChild(div_select_name)
    div_select.appendChild(div_select_date)
    div_select.appendChild(img_menu_extend)
    div_select.appendChild(img_menu_short)
    
    // Select Filter Event Listener :hover in
    document.querySelector('.filter-select').addEventListener('mouseover', displayFilters)
    
    // Select Filter Event Listener :hover out
    document.querySelector('.filter-select').addEventListener('mouseout', hideFilters)

    // Sorted by default 
    let medias = await getMedias()
    let total_likes = 0
    const total_heart_icon = document.createElement('i')
    total_heart_icon.setAttribute('class', 'fa-solid fa-heart')
    div_stat_photographer.appendChild(div_stat_likes)
    div_stat_photographer.appendChild(total_heart_icon)
    div_stat_photographer.appendChild(div_stat_price)
    
    medias.forEach(media => {
        if (dataPhotographer.id === media.photographerId) {    
            const mediaModel = mediaFactory(media)     
            // Total likes         
            total_likes = total_likes + media.likes   
            const mediaCardDOM = mediaModel.getMediaCardDOM();  
            div__photo__section.appendChild(mediaCardDOM)                        
            div_stat_likes.textContent = total_likes                             
         }  
    })

               
}


async function init()
{
    window.photographers = await getPhotographers();
    // A mettre dans une fonction qui retourn l'id en integer
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    // fin
    let current__photographer = null;
    window.photographers.forEach(element => {
        if (element.id === parseInt(params.id))
        {
            current__photographer = element
        } 
    });
    if (!current__photographer)
    {
        alert('rien de rien')
        return 
    }
    displayData(current__photographer)
       
}

init();




