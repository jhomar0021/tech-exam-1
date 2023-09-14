const musicSlider = document.getElementById("musicSlider");
const currentDurationText = document.getElementById("currentDuration");
const musicPlayButton = document.getElementById("musicPlayButton");
const musicPlayIcon = document.getElementById("musicPlaySymbol");
const musicPauseIcon = document.getElementById("musicPauseSymbol");
const musicRecord = document.getElementById("musicRecordImage");
let minutes;
let seconds;

const musicBackButton = document.getElementById("musicBackButton");
const musicForwardButton = document.getElementById("musicForwardButton");


let playing = false;
let Duration = musicSlider.value;


musicSlider.addEventListener("change", () => {
    timer();
})
musicPlayButton.addEventListener("click", () => {
    if (playing == false) {
        play();
    }
    else {
        pause();
    }
});

musicBackButton.addEventListener("click", () => {
    reset();
});

musicForwardButton.addEventListener("click", () => {
    reset();
});

function play() {
    playing = true;
    musicRecord.classList.add("animate-spin");
    timerstart();
    musicPauseIcon.classList.remove("d-none");
    musicPlayIcon.classList.add("d-none")

}

function pause() {
    clearInterval(int);
    musicPauseIcon.classList.add("d-none");
    musicPlayIcon.classList.remove("d-none")
    playing = false;
    musicRecord.classList.remove("animate-spin");
}

function timer() {
    if (musicSlider.value == 613) {
        pause();
    }
    else {
        musicSlider.value++;
        console.log(musicSlider.value);

        minutes = Math.floor((musicSlider.value) / 60);
        seconds = musicSlider.value % 60;



        let m = minutes < 10 ? "0" + minutes : minutes;
        let s =
            seconds < 10
                ? "0" + seconds
                : seconds < 60
                    ? seconds
                    : seconds;

        currentDurationText.innerHTML = `${m}:${s}`;
    }
}

let int;
function timerstart() {
    int = setInterval(timer, 1000);
}

function reset() {
    clearInterval(int);
    Duration = 0;
    minutes = 0;
    seconds = 0;
    musicSlider.value = 0;
    pause();
    currentDurationText.innerHTML = '00:00';
}




function albums(){
    $('#Artist').hide()
    $('#Albums').show()
    $('#btn-album').css('opacity','1')
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://spotify23.p.rapidapi.com/artist_albums/?id=06HL4z0CvFAxyc27GXpf02&offset=0&limit=100',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2cec92329mshe131edc6dcf1210p193c86jsnfd5d418beceb',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        let collections ="";
        let album = response.data.artist.discography.albums.items;

        for(let i=0; i < album.length; i++){
            let albumImg= album[i].releases.items[0].coverArt.sources[0].url;
            let albumName= album[i].releases.items[0].name;
            let albumDate= album[i].releases.items[0].date.year;

            let albumcard = '<div class="albumcard">'+
            '<img  class="album-img mb-3" src="'+albumImg+'" alt="">'+
            '<p>'+albumName+'</p>'+
            '<p>'+albumDate+'</p>'+
            '</div>';
            collections += albumcard;
        }

        $('#Albums').html(collections);

    });
}


function artist(){
    $('#Albums').hide()
    $('#Artist').show()
    $('#btn-artist').css('opacity','1')
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://spotify23.p.rapidapi.com/artist_related/?id=06HL4z0CvFAxyc27GXpf02',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2cec92329mshe131edc6dcf1210p193c86jsnfd5d418beceb',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        console.log(response);
        let artistlist ="";
        let artist = response.artists;

        for(let i=0; i < artist.length; i++){
            let artistImg= artist[i].images[0].url;
            let artistName= artist[i].name;

            let artistcard = '<div class="artistcard">'+
            '<img  class="album-img mb-3" src="'+artistImg+'" alt="">'+
            '<p>'+artistName+'</p>'+
            '</div>';
            artistlist += artistcard;
        }

        $('#Artist').html(artistlist);
    });
}

let btnAlbums = document.getElementById("btn-album");
let btnArtist = document.getElementById("btn-artist");

btnAlbums.addEventListener("click", () => {
    albums();
});

albums();

btnArtist.addEventListener("click", () => {
    
    artist();
});