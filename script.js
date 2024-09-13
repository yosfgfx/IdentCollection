document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('.video-card');
    const scrollArrow = document.querySelector('.scroll-arrow');
    const overlay = document.querySelector('.overlay');
  
    // Animate the first video card
    setTimeout(() => {
      videoCards[0].classList.add('active');
    }, 500);
  
    // Intersection Observer for Animations and Pausing Video on Scroll
    const options = {
      threshold: 0.5
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Pause the video when the card is not in view
          if (video && !video.paused) {
            video.pause();
            video.parentElement.querySelector('.play-button').style.display = 'block';
            overlay.style.display = 'none';
          }
        }
      });
    }, options);
  
    videoCards.forEach(card => {
      observer.observe(card);
    });
  
    // Scroll Arrow Click Event
    scrollArrow.addEventListener('click', () => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  
    // Play Button and Media Wrapper Functionality
    const playButtons = document.querySelectorAll('.play-button');
    const mediaWrappers = document.querySelectorAll('.media-wrapper');
  
    mediaWrappers.forEach(wrapper => {
      wrapper.addEventListener('click', (e) => {
        const video = wrapper.querySelector('video');
        if (video.paused) {
          video.play();
          wrapper.classList.add('scaled');
          wrapper.querySelector('.play-button').style.display = 'none';
          overlay.style.display = 'block';
        }
      });
    });
  
    // Pause Video on Overlay Click or ESC Key
    const pauseVideo = () => {
      const playingVideo = document.querySelector('video:not([paused])');
      if (playingVideo) {
        playingVideo.pause();
        playingVideo.parentElement.classList.remove('scaled');
        playingVideo.parentElement.querySelector('.play-button').style.display = 'block';
        overlay.style.display = 'none';
      }
    };
  
    overlay.addEventListener('click', pauseVideo);
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        pauseVideo();
      }
    });
  
    // Update Play Button on Video End
    document.querySelectorAll('video').forEach(video => {
      video.addEventListener('ended', () => {
        video.parentElement.classList.remove('scaled');
        video.parentElement.querySelector('.play-button').style.display = 'block';
        overlay.style.display = 'none';
      });
    });
  });
  
