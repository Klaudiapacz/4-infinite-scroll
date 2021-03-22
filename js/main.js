console.log(`test`);

let endOfPage = 0;

let preloadring = false;

const showPreloder = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';
    preloadring = true;
}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    preloadring = false;
}

const getData = () => {

    if (!preloadring) {
        showPreloder();
        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);


                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebside = document.createElement('p');

                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User Name: ${user.name}`;
                    pWebside.innerHTML = `User URL: ${user.webside}<br />--------`;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebside);
                }
                
                hidePreloader();
            })
            .catch(error => {
                console.log(error);
            })
    }
    preloadring = true;



}

const scrollToEndOfPage = () => {
    console.log('scrollToEndOfPage');

    let d = document.documentElement;

    // height of an element`s content, including content not visible on the screen
    let scrollHeight = d.scrollHeight;

    // number of pixels that an  element`s content is scrolled vertically 
    let scrollTop = d.scrollTop;

    //inner height of an element in pixels 
    let clientHeight = d.clientHeight;

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(` clientHeight: ${clientHeight}`);
    console.log(` sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);

    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfPage += 1;
        console.log(`end of page ${endOfPage}`);

        getData();
    }

}
window.addEventListener('scroll', scrollToEndOfPage);