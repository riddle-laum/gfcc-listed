// @ts-check

/**
 * @param { number } no
 * @return { Promise<string[]> } list of URLs
 * @throws { Error }
 */
async function fetchVideoURLs(no) {
  if (typeof no !== "number") {
    throw new Error(`argument "no" is not number type`);
  }
  if (!Number.isInteger(no)) {
    throw new Error(`argument "no" is not integer`);
  }
  if (no <= 0 || no > 200 || no == 188) {
    throw new Error(`argument "no" expect 1-200 (omit 188) integer, but detect "${ no }"`);
  }
  const url = `https://${ no }.gigafile.cc/videos.json`;
  const json = await fetch(url).then(res => res.json());
  if (!json.videos || !(json.videos instanceof Array)) {
    throw new Error(`response value has invalid ".videos" value`);
  }
  return json.videos.filter(url => {
    if (typeof url !== "string") {
      return false;
    }
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // fetch("https://12.gigafile.cc/videos.json").then(res => res.text()).then(str => {
  //   const element = document.createElement("details");
  //   element.innerHTML = `<summery> ${ !str ? "no-content" : `conntent (${ str.length } chars)` } </summery>`;
  //   if (str) {
  //     try {
  //       element.innerHTML += "\n" + JSON.stringify(JSON.parse(str), void 0, 2);
  //     } catch {
  //       element.innerHTML += "\n" + str;
  //     }
  //   }
  //   document.body.appendChild(element);
  // });

  // set "n.gigafile.cc"
  /** @type { HTMLInputElement | null } */
  const input_target = document.querySelector("body > div.selector > input");
  if (input_target) {
    input_target.addEventListener("blur", () => {
      const value = Number.parseInt(input_target.value, 10);
      let display = `${ value }`;
      if (value !== value || value <= 0 || value > 200 || value == 188) {
        display = "?";
      }
      display = `${ display }.gigafile.ccのリストを表示`;
      /** @type { HTMLButtonElement | null } */
      const display_target = document.querySelector("body > div.selector > button");
      if (display_target) {
        display_target.innerText = display;
      }
    });
    // set default value
    input_target.value = "1";
  }
});
