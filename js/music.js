document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicToggle.querySelector('.music-icon');
    let isPlaying = false;

    // Debug audio element
    console.log('Audio element:', bgMusic);
    console.log('Audio source:', bgMusic.querySelector('source').src);

    // Set initial volume
    bgMusic.volume = 0.4; // 40% volume

    // Load audio
    try {
        bgMusic.load();
        console.log('Audio loaded');
    } catch (error) {
        console.error('Error loading audio:', error);
    }

    // Function to play/pause music
    async function toggleMusic() {
        console.log('Toggle button clicked');
        
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicIcon.textContent = '🎵';
            console.log('Music paused');
        } else {
            try {
                // Try to play
                await bgMusic.play();
                musicToggle.classList.add('playing');
                musicIcon.textContent = '⏸';
                console.log('Music playing successfully');
            } catch (error) {
                console.error('Playback failed:', error);
                // Check if it's an interaction error
                if (error.name === 'NotAllowedError') {
                    alert('Please click anywhere on the page first, then try playing the music again (browser security requirement)');
                } else {
                    alert('There was an error playing the music. Please check your browser settings and try again.');
                }
                isPlaying = false;
                return;
            }
        }
        isPlaying = !isPlaying;
    }

    // Add click event listener
    musicToggle.addEventListener('click', toggleMusic);

    // Handle audio loading error
    bgMusic.addEventListener('error', function(e) {
        console.error('Error loading audio:', e);
        console.error('Error details:', bgMusic.error);
        alert('Sorry, there was an error loading the background music. Please try refreshing the page.');
    });

    // Handle successful audio loading
    bgMusic.addEventListener('canplaythrough', function() {
        console.log('Audio loaded successfully and can play through');
        console.log('Duration:', bgMusic.duration);
        console.log('Ready state:', bgMusic.readyState);
        musicToggle.style.opacity = '1';
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicToggle.classList.remove('playing');
            musicIcon.textContent = '🎵';
        }
    });

    // Additional debug events
    bgMusic.addEventListener('playing', () => console.log('Audio started playing'));
    bgMusic.addEventListener('pause', () => console.log('Audio paused'));
    bgMusic.addEventListener('waiting', () => console.log('Audio buffering...'));
    bgMusic.addEventListener('suspend', () => console.log('Audio suspended'));
}); 