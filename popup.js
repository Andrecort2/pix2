document.addEventListener('DOMContentLoaded', () => {
  const imageUrlInput = document.getElementById('image-url');
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      imageUrlInput.value = url;
    }
  });

  const pixelSizeInput = document.getElementById('pixel-size');
  const pixelateButton = document.getElementById('pixelate');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const downloadLink = document.getElementById('download');

  pixelateButton.addEventListener('click', () => {
    const pixelSize = parseInt(pixelSizeInput.value);
    const imageUrl = imageUrlInput.value;

    if (isNaN(pixelSize) || pixelSize < 1) {
      alert('Por favor, insira um valor válido para o tamanho dos pixels.');
      return;
    }

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;

    image.onload = () => {
      const width = image.width;
      const height = image.height;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        0,
        0,
        width / pixelSize,
        height / pixelSize
      );
      ctx.drawImage(
        canvas,
        0,
        0,
        width / pixelSize,
        height / pixelSize,
        0,
        0,
        width,
        height
      );

      downloadLink.href = canvas.toDataURL();
      downloadLink.download = 'pixelated-image.png';
      downloadLink.style.display = 'inline';
    };

    image.onerror = () => {
      alert('Não foi possível carregar a imagem. Verifique se a URL está correta.');
    };
  });
});
