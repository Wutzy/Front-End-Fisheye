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
    async function sortByLikes()
    {
        medias = (await getMedias()).sort(function (a, b)
            {

                return a.likes - b.likes;
            })

            let total_likes = 0
            div__photo__section.innerHTML = ''
            medias.forEach(media =>
            {
                if (dataPhotographer.id === media.photographerId)
                {
                    const mediaModel = mediaFactory(media)
                    // Total likes
                    total_likes = total_likes + media.likes
                    const mediaCardDOM = mediaModel.getMediaCardDOM();
                    div__photo__section.appendChild(mediaCardDOM)
                    div_stat_likes.textContent = total_likes
                }
            })
            div_select.prepend(div_select_like)
            hideFilters()
    }

    async function sortByDate()
    {
        medias = (await getMedias()).sort(function (a, b) {

            return new Date(b.date) - new Date(a.date);
        })

        let total_likes = 0
        div__photo__section.innerHTML = ''
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
        div_select.prepend(div_select_date)
        hideFilters()
    }

    async function sortByName()
    {
        medias = (await getMedias()).sort(function (a, b) {

            if(a.title < b.title) return -1;
            if(a.title > b.title) return 1;
            return 0;
        })

        let total_likes = 0
        div__photo__section.innerHTML = ''
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
        div_select.prepend(div_select_name)
        hideFilters()
    }

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
    div_select_like.addEventListener('click', sortByLikes)
    div_select_like.addEventListener('keydown', async function (e)
    {
        let code = e.code
        if(code == 'Enter')
        {
            sortByLikes()
            img_menu_extend.focus()
        }
    })

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
    div_select_name.addEventListener('click', sortByName)
    div_select_name.addEventListener('keydown', async function(e)
    {
        let code = e.code
        if(code == 'Enter')
        {
            sortByName()
            img_menu_extend.focus()
        }
    })
    div_select_name.textContent = 'Titre'

    // Option by date
    const div_select_date = document.createElement('div')
    div_select_date.setAttribute('class', 'filter-date filter-option')
    div_select_date.setAttribute('tabindex', '0')
    div_select_date.addEventListener('click', sortByDate)
    div_select_date.addEventListener('keydown', async function (e)
    {
        let code = e.code
        if(code == 'Enter')
        {
            sortByDate()
            img_menu_extend.focus()
        }
        img_menu_extend.focus()
    })
    div_select_date.textContent = 'Date'

    // Photographer's name on Modal
    const modal_contact_title = document.querySelector('header > h2')
    modal_contact_title.setAttribute('id', 'modal_contact_title')
    modal_contact_title.innerHTML = 'Contactez-moi </br>' + dataPhotographer.name


    // Set a class attribut on div in form
    const contact_form = document.querySelector('form div')
    contact_form.setAttribute('class', 'contactForm')
    contact_form.addEventListener('keydown', function (e)
    {
        let code = e.code
        if(code == 'Escape')
        {
            return closeModal()
        }
    })
    // MODAL CONTACT: Adding alt attribut on send button and close button
    const modal_contact = document.querySelector('.modal')
    modal_contact.setAttribute('alt', 'Contact Me ' + dataPhotographer.name)
    modal_contact.setAttribute('aria-labelledby', 'modal_contact_title')
    const modal_contact_button = document.querySelectorAll('.contact_button')
    modal_contact_button[0].setAttribute('alt', 'Contact Me')
    modal_contact_button[1].setAttribute('alt', 'Send')

    //Add Attributes for forname field
    document.querySelector('.contactForm > label').setAttribute('for', 'forname')
    const modal_input_forname = document.querySelector('.contactForm > input')
    modal_input_forname.setAttribute('id', 'forname')
    modal_input_forname.setAttribute('alt', 'First name')

    //Field Name
    const modal_label_name = customCreateElement('label', 'for', 'name', 'Nom')
    const modal_input_name = document.createElement('input')
    modal_input_name.setAttribute('id', 'name')
    modal_input_name.setAttribute('alt', 'Last name')
    contact_form.appendChild(modal_label_name)
    contact_form.appendChild(modal_input_name)

    //Field Email
    const modal_label_email = customCreateElement('label', 'for', 'email', 'Email')
    contact_form.appendChild(modal_label_email)
    const modal_input_email = document.createElement('input')
    modal_input_email.setAttribute('id', 'email')
    modal_input_email.setAttribute('alt', 'Email')
    contact_form.appendChild(modal_input_email)

    //Field Message
    const modal_label_message = customCreateElement('label', 'for', 'message', 'Votre message')
    contact_form.appendChild(modal_label_message)
    const modal_input_message = document.createElement('input')
    modal_input_message.setAttribute('id', 'message')
    modal_input_message.setAttribute('alt', 'Your message')
    contact_form.appendChild(modal_input_message)


    // Rectangle like + price
    const div_stat_photographer = document.createElement('div')
    div_stat_photographer.setAttribute('class', 'statsPhotographer')
    const div_stat_likes = document.createElement('div')
    div_stat_likes.setAttribute('class', 'likes')
    const div_stat_price = document.createElement('div')
    div_stat_price.setAttribute('class', 'price')
    div_stat_price.textContent = dataPhotographer.price + ' € / jour'
    document.querySelector('body').append(div_stat_photographer)

    //Lightbox
    const div_lightbox = document.createElement('div')
    div_lightbox.setAttribute('class', 'lightbox')
    div_lightbox.setAttribute('class', 'lightbox')
    div_lightbox.setAttribute('id', 'lightbox')
    div_lightbox.setAttribute('aria-hidden', 'true')
    div_lightbox.setAttribute('role', 'dialog')
    const lightbox_img_info = document.createElement('div')
    lightbox_img_info.setAttribute('class', 'lightbox_img_info')
    document.querySelector('body').appendChild(div_lightbox)

    //Lightbox Button Previous
    const img_navigation_previous = document.createElement('img')
    img_navigation_previous.setAttribute('class', 'lightbox_navigation-previous')
    img_navigation_previous.setAttribute('src', '../assets/icons/expand_more-24px5.svg')
    div_lightbox.appendChild(img_navigation_previous)
    document.querySelector('.lightbox_navigation-previous').addEventListener('click', previousLightbox)

    // Lightbox  video
    const vid_main_image = document.createElement('video')
    vid_main_image.setAttribute('class', 'lightbox-video')
    vid_main_image.setAttribute('type', 'video/mp4')
    vid_main_image.setAttribute('role', 'video')
    const vid_source = document.createElement('source')
    div_lightbox.appendChild(vid_main_image)
    vid_main_image.appendChild(vid_source)

    // Lightbox  image
    const img_main_image = document.createElement('img')
    img_main_image.setAttribute('class', 'lightbox_main-image')
    img_main_image.setAttribute('src', '')
    div_lightbox.appendChild(img_main_image)

    // Lightbox Button Next
    const img_navigation_next = document.createElement('img')
    img_navigation_next.setAttribute('class', 'lightbox_navigation-next')
    img_navigation_next.setAttribute('src', '../assets/icons/expand_more-24px5.svg')
    div_lightbox.appendChild(img_navigation_next)
    document.querySelector('.lightbox_navigation-next').addEventListener('click',nextLightbox)

    //Lightbox Button Close
    const img_navigation_close = document.createElement('img')
    img_navigation_close.setAttribute('class', 'lightbox_navigation-close')
    img_navigation_close.setAttribute('src', '../assets/icons/close-24px 1.svg')
    div_lightbox.appendChild(img_navigation_close)
    document.querySelector('.lightbox_navigation-close').addEventListener('click', closeLightbox)
    div_lightbox.appendChild(lightbox_img_info)

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




