// Run this command from the https://github.com/<user>/<repo>/labels page console
// It will place a copy of the labels in your clipboard and download a labels.json file
// This was all inspired from https://gist.github.com/MoOx/93c2853fee760f42d97f

function extractLabels() {
  const labels = [];
  [].slice.call(document.querySelectorAll(".label-link"))
  .forEach(function(element) {
    labels.push({
      name: element.textContent.trim(),
      description: element.getAttribute("aria-label"),
      // using style.backgroundColor might returns "rgb(...)"
      color: element.getAttribute("style")
        .replace("background-color:", "")
        .replace(/color:.*/,"")
        .trim()
        // github wants hex code only without # or ;
        .replace(/^#/, "")
        .replace(/;$/, "")
        .trim(),
    })
  });
  return labels;
}

function saveJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, undefined, 4)], { type: 'text/json' });
  const e = document.createEvent('MouseEvents');
  const a = document.createElement('a');

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
};

const labels = extractLabels();
copy(labels);
saveJSON(labels, 'labels.json')
