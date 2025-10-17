// Generate a random hex color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generate and display 10 random colors
function generateColors() {
  const container = document.getElementById('colorContainer');
  container.innerHTML = ''; // clear previous colors

  for (let i = 0; i < 10; i++) {
    const color = getRandomColor();
    const strip = document.createElement('div');
    strip.className = 'color-strip';
    strip.style.backgroundColor = color;
    strip.textContent = color;
    container.appendChild(strip);
  }
}

// Invert existing colors
function invertColors() {
  const strips = document.querySelectorAll('.color-strip');

  strips.forEach(strip => {
    const bg = window.getComputedStyle(strip).backgroundColor;
    const rgb = bg.match(/\d+/g).map(Number);
    if (rgb.length < 3) return;

    const inverted = rgb.map(v => 255 - v);
    const invertedColor = `rgb(${inverted[0]}, ${inverted[1]}, ${inverted[2]})`;

    strip.style.backgroundColor = invertedColor;
    strip.textContent = rgbToHex(inverted[0], inverted[1], inverted[2]);
  });
}

// Helper: convert RGB to hex
function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

// Run once on load
generateColors();
