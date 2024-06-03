document.getElementById("changeColor").addEventListener("click", () => {
  const color = document.getElementById("colorPicker").value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: changeBackgroundColor,
      args: [color],
    });
  });
});

document.getElementById("modeToggle").addEventListener("change", (event) => {
  const mode = event.target.checked ? "dark" : "light";
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: toggleMode,
      args: [mode],
    });
  });
  updateIcons(mode);
});

function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function toggleMode(mode) {
  if (mode === "dark") {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  }
}

function updateIcons(mode) {
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");
  if (mode === "dark") {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  } else {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  }
}
