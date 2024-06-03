let scrollToTopButton = document.getElementById('return-to-top');
const labels = document.querySelectorAll('.button');


scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

labels.forEach(label => {
    label.addEventListener('click', function() {
        const forAttr = label.getAttribute('for');
        labels.forEach(label => {
            label.classList.remove('outline');
        });
        labels.forEach(label => {
            const labelForAttr = label.getAttribute('for');
            if (labelForAttr === forAttr) {
                label.classList.add('outline');
            }
        });
    });
});