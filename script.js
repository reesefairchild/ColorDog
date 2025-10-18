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

  const count = parseInt(document.getElementById('colorCount').value, 10);

  for (let i = 0; i < count; i++) {
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

function sortColors() {
  const container = document.getElementById('colorContainer');
  const strips = Array.from(container.querySelectorAll('.color-strip'));

  // Convert each strip to an object with color and brightness
  const stripsWithBrightness = strips.map(strip => {
    const bg = window.getComputedStyle(strip).backgroundColor;
    const rgb = bg.match(/\d+/g).map(Number);
    
    // Calculate perceived brightness
    const brightness = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    
    return { strip, brightness };
  });

  // Sort by brightness ascending (lightest → darkest)
  stripsWithBrightness.sort((a, b) => a.brightness - b.brightness);

  // Clear container and append strips in new order
  container.innerHTML = '';
  stripsWithBrightness.forEach(obj => container.appendChild(obj.strip));
}

// Run once on load
generateColors();
