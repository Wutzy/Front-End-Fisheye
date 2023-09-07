const send_button = document.querySelectorAll('.contact_button')
send_button[1].addEventListener('click', function(event) {
    event.preventDefault()
    isValid()
    
});

async function displayModal() {
    const modal = document.getElementById("contact_modal");
    document.querySelector('main').style.opacity = '0.3';
    document.querySelector('header').style.opacity = '0.3';
    document.querySelector('.statsPhotographer').style.opacity = '0.3';
	modal.style.display = "block";
    modal.style.opacity = "1";
    document.querySelector('.contactForm > input').focus()
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    document.querySelector('main').style.opacity = '1';
    document.querySelector('header').style.opacity = '1';
    document.querySelector('.statsPhotographer').style.opacity = '1';
    document.querySelectorAll('input')[0].style.border = 'none';
    document.querySelectorAll('input')[1].style.border = 'none';
    document.querySelectorAll('input')[2].style.border = 'none';
    document.querySelectorAll('input')[3].style.border = 'none';
    modal.style.display = "none";
    return send_button[0].focus()
}

function isValid () {
    const modal_input_email = document.getElementById('email').value
    const modal_input_name = document.getElementById('name').value
    const modal_input_forname = document.getElementById('forname').value
    const modal_input_message = document.getElementById('message').value

    if (modal_input_email === '' || modal_input_name === '' || modal_input_message === '')
    {
        if (modal_input_name === '')
        {
            document.getElementById('name').style.border = 'solid 2px red'
        }else {
            document.getElementById('name').style.border = 'unset'
        }
        if (modal_input_forname === '')
        {
            document.getElementById('forname').style.border = 'solid 2px red'
        }else {
            document.getElementById('forname').style.border = 'unset'
        }
        if (modal_input_email === '')
        {
            document.getElementById('email').style.border = 'solid 2px red'
        }else {
            document.getElementById('email').style.border = 'unset'
        }
        if (modal_input_message === '')
        {
            document.getElementById('message').style.border = 'solid 2px red'
        }else {
            document.getElementById('message').style.border = 'unset'
        }
        return false;
    } else {
        console.log('Prenom:' + modal_input_forname)
        console.log('Nom:' + modal_input_name)
        console.log('Email:' + modal_input_email)
        console.log('Message:' + modal_input_message)
        closeModal()
        return true
        
    }
}