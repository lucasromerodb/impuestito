const tax = {
  ganancias: 0.35,
  pais: 0.30,
}

function priceFormatter(price) {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  return formatter.format(price);
}

function handleMutations(mutations) {
  if (mutations) {

    const items = document.querySelectorAll('.gameDiv');

    if (items.length > 0) {
      for (const item of items) {

        if (item.querySelector('.xboxito') === null) {

          const originalPriceText = item.querySelector('span[itemprop=price]').textContent;
          const originalPriceFormatted = +originalPriceText.replace(/[$\s+]?[.]?/gi, '').replace(',', '.');
          const priceWithTaxes = (originalPriceFormatted + originalPriceFormatted * (tax.ganancias + tax.pais)).toFixed(2)

          const priceWithTaxesElement = document.createElement('p');
          priceWithTaxesElement.innerText = ' ' + priceFormatter(priceWithTaxes);
          priceWithTaxesElement.classList.add('priceWithTaxes', 'xboxito');

          item.appendChild(priceWithTaxesElement);
        }
      }
    }
  }
}

const wrapper = document.querySelector('.gameDivsWrapper');
const observer = new MutationObserver(handleMutations);
const observerOptions = { childList: true };

observer.observe(wrapper, observerOptions);

