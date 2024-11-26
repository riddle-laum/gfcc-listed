// @ts-check

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://12.gigafile.cc/videos.json").then(res => res.text()).then(str => {
    const element = document.createElement("details");
    element.innerHTML = `<summery> ${ !str ? "no-content" : `conntent (${ str.length } chars)` } </summery>`;
    if (str) {
      try {
        element.innerHTML += "\n" + JSON.stringify(JSON.parse(str), void 0, 2);
      } catch {
        element.innerHTML += "\n" + str;
      }
    }
    document.body.appendChild(element);
  });
  fetch("https://12.gigafile.cc/videos.json", { mode: "no-cors" }).then(res => res.text()).then(str => {
    const element = document.createElement("details");
    element.innerHTML = `<summery> [no-cors] ${ !str ? "no-content" : `conntent (${ str.length } chars)` } </summery>`;
    if (str) {
      try {
        element.innerHTML += "\n" + JSON.stringify(JSON.parse(str), void 0, 2);
      } catch {
        element.innerHTML += "\n" + str;
      }
    }
    document.body.appendChild(element);
  });
});
