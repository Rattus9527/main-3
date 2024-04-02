import text from "./text.js";

const main = document.querySelector("main");
const textArea = document.querySelector(".text-box");
const allBtn = document.querySelectorAll(".btn img");
const logBtn = document.querySelector(".log-btn");
const logArea = document.querySelector(".log");
const sence = document.querySelector(".sence");
const shakeText = document.querySelectorAll(".shake");

let currentText = 1;
let textLog = [];
let shakeStart = false;

function pageInit() {
  let textList = textInit();
  textList += `<button class="btn main-btn">
        <img src="src/img/主線UI/btn_sen_normal.png" alt="" data-next="${text[currentText].next}"/>
        <p data-next="${text[currentText].next}">${text[currentText].btn}</p>
    </button>`;
  textArea.innerHTML = textList;
  const paragraph = document.querySelectorAll(".text");
  paragraph.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 1000 * i);
  });
  mainBtnShow(paragraph.length);
  logInit();
}
function eventPageInit(num) {
  let textList = textInit();
  text[currentText].hint.forEach((el) => {
    textList += el;
  });
  textArea.innerHTML = textList;
  const paragraph = document.querySelectorAll(".text");
  paragraph.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 1000 * i);
  });
  switch (num) {
    case "2":
      page2init();
      text[currentText].pureText.forEach((el) => {
        textLog.push(el);
      });
      break;
    case "3":
      page3init();
      text[currentText].pureText.forEach((el) => {
        textLog.push(el);
      });
      break;
    case "l_5":
    case "m_5":
    case "r_5":
      page5init();
      mainBtnShow(1);
      break;
    case "6":
      page6init();
      break;
    case "7":
      main.classList.remove("darker-mode");
      closeLight();
      page7init();
      break;
    case "8":
      page8init();
      break;
    case "9":
      backToNormal();
      page9init();
      break;
  }
}
function textInit() {
  let textList = "";
  text[currentText].paragraphs.forEach((el) => {
    textList += `<p class="text">${el}</p>`;
    textLog.push(el);
  });
  return textList;
}
function mainBtnShow(delay) {
  const mainBtn = document.querySelectorAll(".main-btn");
  mainBtn.forEach((el) => {
    setTimeout(() => {
      el.classList.add("btn-show");
    }, 1000 * delay);
  });
}
function logInit() {
  let logList = "";
  textLog.forEach((el) => {
    logList += `<p>${el}</p>`;
  });
  logArea.innerHTML = logList;
}

function page2init() {
  sence.setAttribute("src", "src/img/EP3/3-2-1.png");
  const hint = document.querySelectorAll(".hint");
  hint.forEach((el) => {
    el.addEventListener("click", (e) => {
      const show = document.querySelector(
        `.${e.target.getAttribute("data-show")}`
      );
      show.classList.add("show");
      sence.setAttribute("src", "src/img/EP3/3-2-2.png");
      if (e.target.getAttribute("data-show") == "sea") {
        mainBtnShow(1);
        sence.setAttribute("src", "src/img/EP3/3-2-3.png");
      }
    });
  });
}
function page3init() {
  sence.setAttribute("src", "src/img/EP3/3-3.png");
  const hint = document.querySelector(".hint");
  hint.addEventListener("click", () => {
    const blood = document.querySelector(".blood");
    blood.classList.add("btn-show");
    shakeStart = true;
    const animation = () => {
      if (shakeStart) {
        shakeText.forEach((char) => {
          char.style.transform = `translate(${getRandomNum()}px, ${getRandomNum()}px)`;
        });
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
    blood.addEventListener("click", () => {
      sence.setAttribute("src", "src/img/EP3/3-3-1.png");
      bloodScene();
      blood.classList.remove("btn-show");
      shakeStart = false;
      document.querySelector(".mainbtn-group").classList.add("btn-show");
    });
  });
}
function page5init() {
  backToNormal();
  sence.setAttribute("src", "src/img/EP3/3-5.png");
  text[currentText].pureText.forEach((el) => {
    textLog.push(el);
  });
  const hint = document.querySelectorAll(".hint");
  hint.forEach((el) => {
    el.addEventListener("click", (e) => {
      const show = document.querySelector(
        `.${e.target.getAttribute("data-show")}`
      );
      show.classList.add("show");
    });
  });
}
function page6init() {
  sence.setAttribute("src", "src/img/EP3/3-6.png");
  let redText = document.querySelectorAll(".text")[1];
  setTimeout(() => {
    redText.classList.add("special-animation");
  }, 2000);
  redText.addEventListener("animationend", () => {
    text[currentText].nextParagraphs.forEach((el, i) => {
      setTimeout(() => {
        let newP = document.createElement("p");
        newP.className = "text show";
        newP.innerHTML = el;
        textArea.appendChild(newP);
      }, 1000 * (i + 1));
    });
  });
  text[currentText].pureText.forEach((el) => {
    textLog.push(el);
  });
}
function blackPage() {
  const darkness = document.querySelector(".darkness");
  darkness.classList.add("btn-show");
  let newParagraph = document.createElement("p");
  newParagraph.className = "type";
  darkness.appendChild(newParagraph);
  let i = 0;
  let txt = text[currentText].paragraphs;
  let speed = 200;
  textLog.pop();
  textLog.push(text[currentText].paragraphs);
  function typeWriter() {
    if (i < txt.length) {
      document.querySelector(".type").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
      if (i == 26) {
        speed = 1000;
      }
    } else {
      textLog.push(`<hr>`);
      logInit();
      closeAllLight();
      sence.setAttribute("src", "src/img/主線UI/插圖框_黑白.png");
      currentText = "b_next";
      setTimeout(() => {
        darkness.classList.remove("btn-show");
        let textList = textInit();
        textList += `<button class="btn main-btn">
        <img src="src/img/主線UI/btn_sen_BW.png" alt="" data-next="${text[currentText].next}"/>
        <p data-next="${text[currentText].next}">${text[currentText].btn}</p>
        </button>`;
        textArea.innerHTML = textList;
        const paragraph = document.querySelectorAll(".text");
        paragraph.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("show");
          }, 1000 * i);
        });
        mainBtnShow(paragraph.length);
        logInit();
      }, 2000);
    }
  }
  typeWriter();
}
function page7init() {
  sence.setAttribute("src", "src/img/EP3/3-7.gif");
  let textList = "";
  text[currentText].crystalText.forEach((el, i) => {
    textList += `<p class="text">${el}</p>`;
    if (i != 5) {
      textList += `<p class="hidden talk-effect">${text[currentText].talk[i]}</p>`;
    } else {
      textList += `<p class="hidden">${text[currentText].talk[i]}</p>`;
    }
  });
  textList += text[currentText].hint[0];
  textArea.innerHTML = textList;
  const paragraph = document.querySelectorAll(".text");
  paragraph.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 1000 * i);
  });
  document.querySelectorAll(".text-area .hidden").forEach((el) => {
    setTimeout(() => {
      el.classList.remove("hidden");
    }, 2000);
  });
  text[currentText].pureText.forEach((el) => {
    textLog.push(el);
  });
  mainBtnShow(7);
}
function page8init() {
  sence.setAttribute("src", "src/img/EP3/3-8OFF.gif");
  let textList = "";
  text[currentText].talk.forEach((el) => {
    textList += el;
  });
  textList += text[currentText].hint[0];
  textArea.innerHTML = textList;
  console.log(textList);
  const paragraph = document.querySelectorAll(".text");
  paragraph.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 1000 * i);
  });
  const hint = document.querySelectorAll(".hint");
  hint.forEach((el) => {
    el.addEventListener("click", (e) => {
      const show = document.querySelector(
        `.${e.target.getAttribute("data-show")}`
      );
      show.classList.add("show");
    });
  });
  mainBtnShow(5);
  text[currentText].pureText.forEach((el) => {
    textLog.push(el);
  });
}
function page9init() {
  sence.setAttribute("src", "src/img/EP3/3-8.png");
  setTimeout(() => {
    sence.setAttribute("src", "src/img/EP3/3-9.png");
  }, 2000);
  const hint = document.querySelector(".hint");
  hint.addEventListener("click", (e) => {
    const show = document.querySelector(
      `.${e.target.getAttribute("data-show")}`
    );
    show.classList.add("show");
    mainBtnShow(2);
  });
}
pageInit();

textArea.addEventListener("click", (e) => {
  if (e.target.getAttribute("data-next")) {
    textLog.push(`<hr>`);
    logInit();
    currentText = e.target.getAttribute("data-next");
    if (e.target.getAttribute("data-next") == "black") {
      blackPage();
    } else if (text[currentText].hasEvent) {
      eventPageInit(currentText);
    } else {
      pageInit();
    }
  }
});

function closeLight() {
  main.classList.add("dark-mode");
  allBtn.forEach((node) => {
    node.setAttribute("src", "src/img/主線UI/btn_sen_off.png");
  });
  logBtn.innerHTML = `<img src="src/img/主線UI/logbtn_off.png" alt="" />`;
}
function closeAllLight() {
  main.classList.add("darker-mode");
  allBtn.forEach((node) => {
    node.setAttribute("src", "src/img/主線UI/btn_sen_BW.png");
  });
  logBtn.innerHTML = `<img src="src/img/主線UI/logbtn_BW.png" alt="" />`;
}
function bloodScene() {
  main.classList.add("blood-scene");
  allBtn.forEach((node) => {
    node.setAttribute("src", "src/img/主線UI/btn_sen_blood.png");
  });
  logBtn.innerHTML = `<img src="src/img/主線UI/logbtn_blood.png" alt="" />`;
}
function backToNormal() {
  main.setAttribute("class", "");
  allBtn.forEach((node) => {
    node.setAttribute("src", "src/img/主線UI/btn_sen_normal.png");
  });
  logBtn.innerHTML = `<img src="src/img/主線UI/logbtn_normal.png" alt="" />`;
}
function getRandomNum() {
  let num = Math.ceil(Math.random() * 5) - 3;
  return num;
}

logBtn.addEventListener("click", () => {
  logArea.classList.add("show");
});
logArea.addEventListener("click", () => {
  logArea.classList.remove("show");
});
window.addEventListener("load", (e) => {
  if (window.innerHeight <= 640) {
    document.querySelector("main").classList.add("small-main");
    document.querySelector(".battle").classList.add("small-main");
  }
});
window.addEventListener("resize", (e) => {
  if (window.innerHeight <= 640) {
    document.querySelector("main").classList.add("small-main");
    document.querySelector(".battle").classList.add("small-main");
  } else {
    document.querySelector("main").classList.remove("small-main");
    document.querySelector(".battle").classList.remove("small-main");
  }
});
