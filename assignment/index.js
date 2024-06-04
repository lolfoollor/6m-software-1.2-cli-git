const radioBtns = document.querySelectorAll('input[type="radio"]');
const numRadioBtn = radioBtns.length;
let scrollToTopButton = document.getElementById('return-to-top');
const buttonLabels = document.querySelectorAll('.button');
const contentContainers = document.querySelectorAll('.content-container');
let currRadioButton;

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

/*Disable repeat function for Xms*/
function debounce(func, wait = 1000) {
    let timeout;
    let isPending = false;
  
    return (...args) => {
      if (isPending) return;
      isPending = true;
      func.apply(this, args);
  
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isPending = false;
      }, wait);
    };
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
    let isDragging = false;

    contentContainer.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
        isDragging = true;
        console.log("mousedown", isDragging);
    });

    document.addEventListener('pointermove', debounce((e) => {
        if (!isDragging) return;

        const diffX = e.clientX - startX;
        console.log("mousemove", diffX);

        if (Math.abs(diffX) > 5) {
            let nextId; 
            if (diffX > 0) {
                nextId = currRadioButton % numRadioBtn + 1;
            } else {
                nextId = (currRadioButton === 1) ? numRadioBtn : currRadioButton - 1;
            }
            let nextButtonId = "radio" + nextId;
            updateNavigationBtn(buttonLabels, nextButtonId);
            startX = e.clientX;
        };
    }));

    document.addEventListener('pointerup', () => {
        console.log("mouseup");
        isDragging = false;
    });
});

