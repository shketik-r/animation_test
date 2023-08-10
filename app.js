const page = document.querySelector(".page");
const el_1 = document.querySelector(".el_1");
const el_2 = document.querySelector(".el_2");
const el_3 = document.querySelector(".el_3");
let scrollCounter = 0;
const windowInnerHeight = document.documentElement.clientHeight; //размер экрана

let flag = true;
let counter = 0;
document.onwheel = function (e) {
  checkingCenter();
  if (flag) {
    skroll(e);
  } else {
    turnCounter(e);

    if (counter >= 0 && counter <= 90) {
      blockRotation(el_1, counter);
      if (counter === 0) {
        flag ? (flag = false) : (flag = true);
      }
    }

    if (counter >= 90 && counter <= 180) {
      blockRotation(el_2, counter - 90);
    }

    if (counter >= 180 && counter <= 270) {
      blockRotation(el_3, counter - 180);
      if (counter === 270) {
        flag ? (flag = false) : (flag = true);
      }
    }
    checkingCenter();
  }
};

function blockRotation(block, counter) {
  block.style.setProperty(`--element-transform`, counter + "deg");
}

function turnCounter(e) {
  e.deltaY > 0 ? (counter = counter + 10) : (counter = counter - 10);
}

function skroll(e) {
  e.deltaY > 0 ? scrollDown() : scrollUp();
}

function scrollDown() {
  if (scrollCounter <= windowInnerHeight * 2) {
    scrollCounter = scrollCounter + 20;
    page.scrollTop = scrollCounter;
  }
}

function scrollUp() {
  if (scrollCounter >= 0) {
    scrollCounter = scrollCounter - 20;
    page.scrollTop = scrollCounter;
  }
}

function checkingCenter() {
  if (
    (scrollCounter >= windowInnerHeight && counter === 0) ||
    (scrollCounter <= windowInnerHeight && counter === 270)
  ) {
    flag ? (flag = false) : (flag = true);
  }
}
/******--------------mobile----------------*******/
let event = null;
let direction = 0;
document.addEventListener("touchstart", function (e) {
  event = e;
});
document.addEventListener("touchmove", function (e) {
  if (event) {
    direction = e.touches[0].pageY - event.touches[0].pageY;

    console.log(counter);
    console.log(scrollCounter);
    console.log("windowInnerHeight", windowInnerHeight);
    checkingCenter();
    if (flag) {
      directionY();
    } else {
      console.log(flag);
      turnCounterTouch();
      if (counter >= 0 && counter <= 90) {
        blockRotation(el_1, counter);
        if (counter === 0) {
          flag ? (flag = false) : (flag = true);
        }
      }

      if (counter >= 90 && counter <= 180) {
        blockRotation(el_2, counter - 90);
      }

      if (counter >= 180 && counter <= 270) {
        blockRotation(el_3, counter - 180);
        if (counter === 270) {
          flag ? (flag = false) : (flag = true);
        }
      }
      checkingCenter();
    }
  }
});
document.addEventListener("touched", function (e) {
  event = null;
});

function directionY() {
  if (direction > 0) {
    if (scrollCounter >= 0) {
      scrollCounter = scrollCounter - 20;
      page.scrollTop = scrollCounter;
    }
  } else {
    if (scrollCounter <= windowInnerHeight * 2) {
      scrollCounter = scrollCounter + 20;
      page.scrollTop = scrollCounter;
    }
  }
}
function turnCounterTouch() {
  direction > 0 ? (counter = counter - 10) : (counter = counter + 10);
}
