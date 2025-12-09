const streams = [
    {
        title: "Epic Adventure!",
        description: "Join us for an epic journey through the Land of Ooo with Finn, Jake, and all your favorite characters! This livestream features the best moments and episodes from the beloved series, Adventure Time. Whether you're a long-time fan or new to the show, this compilation is sure to bring back memories and create new ones.",
        videoId: "uZkaJ3e9nfY",
        theme: "epic"
    },
    {
        title: "The Amazing World of Gumball Live!",
        description: "Gumball, the amusing blue cat with a giant head and his best buddy Darwin, a pet goldfish who sprouted legs, step up the hilarity and hijinks in Cartoon Network's comedy series, The Amazing World of Gumball. The BAFTA award-winning series tells the story of an extra-ordinary suburban family who just happen to live in an ordinary town.",
        videoId: "nIyaCRNwxhU",
        theme: "gumball"
    },
    {
        title: "GODZILLA Marathon!",
        description: "It's a Godzilla movie Marathon including Monsters Attack (1969), Ebirah, Horror of the Deep (1966), Invasion of Astro-Monster (1965), Terror of Mechagodzilla (1975), The War of the Gargantuas (1966).",
        videoId: "1KOrtKvwwDg",
        theme: "gojira"
    },
    {
        title: "Total Drama LIVE!",
        description: "Binge every episode of Total Drama Action plus the Celebrity Manhunt special, non-stop! Follow fan-favorites like Gwen, Duncan, Heather, Owen, Courtney, and the rest of the cast as they battle through wild movie-themed challenges, outrageous drama, and shocking eliminations — all for the grand prize.",
        videoId: "1lamfAMKVRQ",
        theme: "total-drama"
    },
    {
        title: "The Boondocks",
        description: "After moving from the South Side of Chicago, the Freeman family navigates their new life in a predominately white suburb, with the main conflict arising from the clash between the brothers' different personalities and their grandfather's attempts to live a peaceful life.",
        videoId: "_iyvzTnpTdg",
        theme: "boondocks"
    },
    {
        title: "Moomin Live!",
        description: "The \"Moomin\" shows are a series of animated adaptations of Tove Jansson's books about a family of hippo-like trolls who live in Moominvalley. These shows, including the popular 1990s series and the 2019 CGI-animated Moominvalley, follow the family through adventures that explore themes of love, friendship, and nature.",
        videoId: "f8Mt85VmBD0",
        theme: "moomin"
    },
];

let player;
let currentIndex = 0;
let isMuted = true;

// Load YouTube IFrame API in JavaScript (recommended by YouTube's documentation)
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Initialize player when API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: streams[currentIndex].videoId,
        playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            mute: 1
        },
        events: {
            onReady: updateDisplay,
            onStateChange: setPageControlsState
        }
    });
}

// Used to update theme, title, and description for video
function updateDisplay() {
    const current = streams[currentIndex];

    // Update body element to include channel-specific theme class
    if (current.theme) {
        document.body.className = current.theme;
    }
    // Update title/description elements in the 'video-info' element
    document.getElementById('current-title').textContent = current.title;
    document.getElementById('current-description').textContent = current.description;
}

/* Needed to create this function so that the page control state reflects play/pause events a user can make
   in the YT player itself. This was tricky.
*/
function setPageControlsState() {
    const playPauseIcon = document.getElementById('play-pause-icon');
    const playPauseBtn = document.getElementById('btn-play-pause');

    if (isPlaying()) {
        // display the gray pause button/icon
        playPauseIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>';
        playPauseBtn.className = 'btn-gray';
    } else {
        // display the red play button/icon
        playPauseIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>';
        playPauseBtn.className = 'btn-red';
    }
}

// Used to determine if the YT player is initialized and a video is currently playing
function isPlaying() {
    if (player) {
        return player.getPlayerState() === YT.PlayerState.PLAYING;
    }
    return false;
}

// Changes channel based on a provided stream index
function changeChannel(newIndex) {
    currentIndex = newIndex;
    if (player) {
        player.loadVideoById(streams[currentIndex].videoId);
        updateDisplay();
    }
}

// Initialize the 'click' event listeners for the various buttons
// Channel up
document.getElementById('btn-ch-up').addEventListener('click', () => {
    changeChannel((currentIndex + 1) % streams.length);
});
// Channel down
document.getElementById('btn-ch-down').addEventListener('click', () => {
    changeChannel((currentIndex - 1 + streams.length) % streams.length);
});
// Play a random channel button
document.getElementById('btn-random').addEventListener('click', () => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * streams.length);
    } while (newIndex === currentIndex && streams.length > 1);
    changeChannel(newIndex);
});
// Volume up
document.getElementById('btn-vol-up').addEventListener('click', () => {
    if (player) {
        const currentVolume = player.getVolume();
        player.setVolume(Math.min(currentVolume + 25, 100));
    }
});
// Volume down
document.getElementById('btn-vol-down').addEventListener('click', () => {
    if (player) {
        const currentVolume = player.getVolume();
        player.setVolume(Math.max(currentVolume - 25, 0));
    }
});
// Play/Pause
document.getElementById('btn-play-pause').addEventListener('click', () => {
    if (player) {
        const playPauseIcon = document.getElementById('play-pause-icon');
        const playPauseBtn = document.getElementById('btn-play-pause');

        if (isPlaying()) {
            player.pauseVideo();
            playPauseIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>';
            playPauseBtn.className = 'btn-red';
        } else {
            player.playVideo();
            playPauseIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>';
            playPauseBtn.className = 'btn-gray';
        }
    }
});
// Mute/UnMute
document.getElementById('btn-mute').addEventListener('click', () => {
    if (player) {
        const muteIcon = document.getElementById('mute-icon');
        const muteBtn = document.getElementById('btn-mute');

        if (isMuted) {
            player.unMute();
            muteIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>';
            muteBtn.className = 'btn-gray';
        } else {
            player.mute();
            muteIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>';
            muteBtn.className = 'btn-red';
        }
        isMuted = !isMuted;
    }
});