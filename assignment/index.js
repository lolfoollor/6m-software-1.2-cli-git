const radioBtns = document.querySelectorAll('input[type="radio"]');
const numRadioBtn = radioBtns.length;
let scrollToTopButton = document.getElementById('return-to-top');
const buttonLabels = document.querySelectorAll('.button');
const contentContainers = document.querySelectorAll('.content-container');
let currRadioButton;
let isTransitioning = false;

/*Init*/
updateNavigationBtn(buttonLabels, "radio1");

function updateNavigationBtn(buttonLabels, targetRadioId) {
    targetId = parseInt(targetRadioId.slice(-1));
    if (!targetRadioId.startsWith('radio') || currRadioButton === targetId) return;
    currRadioButton = parseInt(targetId);
    buttonLabels.forEach(buttonLabel => buttonLabel.classList.remove('outline'));

    const buttonLabelArr = [...buttonLabels];
    let radioButton = document.getElementById(targetRadioId);
    radioButton.checked = true;
    const targetRadioButtonsLabel = buttonLabelArr.filter(buttonLabel => buttonLabel.getAttribute('for') === targetRadioId);
    targetRadioButtonsLabel.forEach(radioButtonsLabel => radioButtonsLabel.classList.add('outline'));
}

buttonLabels.forEach(buttonLabel => {
    buttonLabel.addEventListener('click', function() {
        const forAttr = buttonLabel.getAttribute('for');
        updateNavigationBtn(buttonLabels, forAttr)
    });
});

scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

contentContainers.forEach(contentContainer => {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    contentContainer.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
    });

    document.addEventListener('pointermove', (e) => {
        if (!isDragging || isTransitioning) return;

        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;

        if (Math.abs(diffX) > 300 && Math.abs(diffY) *  2 <= Math.abs(diffX)) {
            let nextId; 
            if (diffX > 0) {
                nextId = currRadioButton % numRadioBtn + 1;
            } else {
                nextId = (currRadioButton === 1) ? numRadioBtn : currRadioButton - 1;
            }
            let nextButtonId = "radio" + nextId;
            isTransitioning = true;
            updateNavigationBtn(buttonLabels, nextButtonId);
            setTimeout(() => {
                isTransitioning = false;
            }, 1000);
            startX = e.clientX;
            startY = e.clientY;
            
            /* Remove any Selection accidently cause by dragging */
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }
        };
    });

    document.addEventListener('pointerup', () => {
        isDragging = false;
    });

    document.addEventListener('pointerleave', () => {
        isDragging = false;
    });
});
