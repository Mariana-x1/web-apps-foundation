// Get sliders and color display element
const colorDisplay = document.getElementById("colorDisplay");
const redSlider = document.getElementById("redSlider");
const greenSlider = document.getElementById("greenSlider");
const blueSlider = document.getElementById("blueSlider");

const randomColorBtn = document.getElementById("randomColorBtn");

// Event listeners for slider input changes
redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);

randomColorBtn.addEventListener("click");

// Function to update color based on slider values
function updateColor() {
  const red = redSlider.value;
  const green = greenSlider.value;
  const blue = blueSlider.value;
  const color = `rgb(${red}, ${green}, ${blue})`;
  document.body.style.backgroundColor = color;
  colorDisplay.textContent = `RGB: ${red}, ${green}, ${blue}`;
}

// Initial update of color
updateColor();
