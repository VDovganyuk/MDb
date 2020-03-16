_apiKey = ``;

class MDbService {

    async getResource(URL) {
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`Could not fetch /${URL}/, received /${res.status}/`);
        }
        return await res.json();
    }

    async getSearchName(name) {
        this.name = name;
        const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=${_apiKey}&query=/${name}/`);
        return res.results;
    }

    async getSearch(apiId) {
        this.apiId = apiId;
        const res = await this.getResource(`https://api.themoviedb.org/3/movie/${apiId}?api_key=${_apiKey}`);
        return res;
    }

    async getSearchTr() {
        const res = await this.getResource(`https://api.themoviedb.org/3/movie/popular?api_key=${_apiKey}&language=en-US&page=1`);
        return res.results;
    }


    async getSearchR(id) {
        this.id = id;
        const res = await this.getResource(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${_apiKey}&language=en-US&page=1`);
        return res.results;
    }
}


function read() {
    const val = document.getElementById('idInput').value;
    return val;
}


const btn = document.getElementsByTagName('button');




btn[0].onclick = function () {
    const img = document.querySelector('#idg');
    img.setAttribute('src', '');
    const element = document.getElementById('blockTrandingMovie').innerHTML = "";
    document.getElementById('par').innerHTML = "";
    document.getElementById('par1').innerHTML = "";
    const element1 = document.getElementById('blockRecommendedMovie').innerHTML = "";



    const MDb = new MDbService(),
        searchElements = read();
    MDb.getSearchName(searchElements).then((arr) => {

        arr.forEach((p) => {
            const name = p.title;
            const id = p.id;
            writehref(name, id);

        });

    });
};

function writehref(name, id) {
    const element = document.getElementById('blockTrandingMovie'),
        link = document.createElement('a'),
        br = document.createElement('br');

    link.innerHTML = name;
    link.id = id;
    link.href = `javascript:infoSearchMovie(${id})`;
    element.appendChild(br);
    element.appendChild(link);



}

function infoSearchMovie(id) {
    element1 = document.getElementById('blockRecommendedMovie').innerHTML = "";
    MDb2 = new MDbService();
    MDb2.getSearch(id).then((arr) => {
        const name = arr.original_title,
            ove = arr.overview,
            img1 = arr.poster_path,
            element = document.getElementById('blockTrandingMovie').innerHTML = "",
            img = document.querySelector('#idg');

        document.getElementById('par').innerHTML = name;
        document.getElementById('par1').innerHTML = ove;
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${img1}`);


    });
    reсomend(id);
};


function recomendsMovie(name, id) {

    const element = document.getElementById('blockRecommendedMovie'),
        link = document.createElement('a'),
        br = document.createElement('br');



    link.innerHTML = name;


    link.href = `javascript:infoSearchMovie(${id})`;


    element.appendChild(br);
    element.appendChild(link);

}

function traning() {
    MDb3 = new MDbService();
    MDb3.getSearchTr().then((arr) => {
        arr.forEach((p) => {
            const name = p.original_title;
            const id = p.id;
            writehref(name, id);
        });

    });
}


function reсomend(id) {
    const MDb4 = new MDbService();
    MDb4.getSearchR(id).then((arr) => {
        arr.forEach((p) => {
            const name = p.title;
            const id = p.id;
            recomendsMovie(name, id);
        });

    });
}