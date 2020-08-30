// Taylor Simpson - Ada App Hacks 2020

// Allows the buttons to open up, and adds the up and down button on the far right.
// Accordion is a general named used to describe the drop downs as a whole.
var accordions = document.getElementsByClassName("btn");

for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function () {
    this.classList.toggle('is-open');

    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      // accordion is currently open, so close it
      content.style.maxHeight = null;
    } else {
      // accordion is currently closed, so open it
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}
