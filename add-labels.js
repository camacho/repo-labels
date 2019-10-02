// Run from the label page console https://github.com/<user>/<repo>/labels

const labels = [];
[].slice.call(document.querySelectorAll(".label-link"))
.forEach(function(element) {
  labels.push({
    name: element.textContent.trim(),
    description: element.getAttribute("title"),
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
})

function addNewLabel (label) {
  document.querySelector('.js-new-label-name-input').value = label.name
  document.querySelector('.js-new-label-description-input').value = label.description
  document.querySelector('.js-new-label-color-input').value = '#' + label.color
  document.querySelector('.js-details-target ~ .btn-primary').disabled = false
  document.querySelector('.js-details-target ~ .btn-primary').click()
}

function addLabel (label) {
  if (!updateLabel(label)) addNewLabel(label)
}

function addLabels (labels) {
  labels.forEach((label) => addNewLabel(label))
}

