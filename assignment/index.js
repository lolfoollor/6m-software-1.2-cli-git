var scrollToTopButton = document.getElementById('return-to-top');

scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});


