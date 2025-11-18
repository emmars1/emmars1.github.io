const streams = [
    {
        channel: "95",
        title: "Moomin Live!",
        description: "Watch full episodes of your favourite Moomin adventures anytime!",
        videoId: "f8Mt85VmBD0"
    },
    {
        channel: "127",
        title: "GODZILLA Marathon!",
        description: "It's a Godzilla movie Marathon including Monsters Attack (1969), Ebirah, Horror of the Deep (1966), Invasion of Astro-Monster (1965), Terror of Mechagodzilla (1975), The War of the Gargantuas (1966).",
        videoId: "Epc0JNdtvM0"
    },
    {
        channel: "101",
        title: "Epic Adventure!",
        description: "Join us for an epic journey through the Land of Ooo with Finn, Jake, and all your favorite characters! This livestream features the best moments and episodes from the beloved series, Adventure Time. Whether you're a long-time fan or new to the show, this compilation is sure to bring back memories and create new ones.",
        videoId: "uZkaJ3e9nfY"
    },
    {
        channel: "44",
        title: "Everybody Hates Chris",
        description: "\"Everybody Hates Chris\" is a comedy series based on Chris Rock's teenage years in 1980s Brooklyn. It follows young Chris navigating high school, family life, and neighborhood challenges with a humorous twist. The show combines Rock's real-life experiences with comedic moments from his struggles and triumphs.",
        videoId: "h22t62fcqO4"
    },
    {
        channel: "11",
        title: "Total Drama LIVE!",
        description: "Binge every episode of Total Drama Action plus the Celebrity Manhunt special, non-stop! Follow fan-favorites like Gwen, Duncan, Heather, Owen, Courtney, and the rest of the cast as they battle through wild movie-themed challenges, outrageous drama, and shocking eliminations — all for the grand prize.",
        videoId: "1lamfAMKVRQ"
    },
    {
        channel: "63",
        title: "The Boondocks",
        description: "The Boondocks Full Episodes Season 2025",
        videoId: "_iyvzTnpTdg"
    }
];

// default to playing the first item in the stream list
let currentStreamIndex = 0;

// Initialize the page
function init() {
    renderChannelList();
    loadStream(0);
}

// Render the channel list in the sidebar
function renderChannelList() {
    const channelList = document.getElementById('channelList');
    channelList.innerHTML = '';

    streams.forEach((stream, index) => {
        const li = document.createElement('li');
        li.className = 'channel-item';
        // active class will stroke the video selected
        if (index === currentStreamIndex) {
            li.classList.add('active');
        }

        li.innerHTML = `<div class="channel-title">${stream.title}<br/>
                        <div class="channel-label">Channel: ${stream.channel}</div></div>`;

        li.addEventListener('click', () => loadStream(index));

        channelList.appendChild(li);
    });
}

// Loads a stream by index
function loadStream(index) {
    currentStreamIndex = index;
    const stream = streams[index];

    // load/replace title and description with selected video's values
    document.getElementById('videoTitle').textContent = stream.title;
    document.getElementById('videoDescription').textContent = stream.description;

    // laod/replace the video player embed code
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${stream.videoId}?autoplay=1&mute=1"
          title="${stream.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      `;

    /*
    Embed code template:
    <iframe
            src="https://www.youtube.com/embed/Epc0JNdtvM0?si=fTD6xrggGofSjFAc?autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
     */

    // Update state of the active video in sidebar
    renderChannelList();
}

// DOM is loaded, call init
document.addEventListener('DOMContentLoaded', init);