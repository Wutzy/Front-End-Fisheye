function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("aria-label", "Ouvrir la gallerie de : " + name);
        const a = document.createElement('a');
        a.setAttribute("id", id );
        a.setAttribute("href", "#");
        a.addEventListener('click', function() {
            //localStorage.setItem('photographer__object', JSON.stringify(data));
            window.location.href = 'photographer.html?id=' + id;
            return { data, getUserCardDOM }
        })
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const span1 = document.createElement('span');
        span1.setAttribute("class", "tagline");
        span1.textContent = tagline;

        const span2 = document.createElement('span');
        span2.setAttribute("class", "price_section");
        span2.textContent = price + "€/jour";

        const h4 = document.createElement( 'h4' );
        h4.textContent = city + " " +  country;
        
        article.appendChild(a);
        a.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(span1);
        article.appendChild(span2);
        return (article);
    }
    
    return { data, getUserCardDOM }
}
