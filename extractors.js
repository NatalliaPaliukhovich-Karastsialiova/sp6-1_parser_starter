import * as utils from './utils.js';

const extractKeywords = (keywords) => {
  return keywords?.getAttribute('content').split(',').map(i => i.trim()) || [];
}

const extractOpengraph = (ogMetaTags) => {
  return Array.from(ogMetaTags).reduce((acc, tag) => {
    const property = tag.getAttribute('property')?.replace('og:', '').trim();
    const content = utils.substrBeforeSymbol(tag.getAttribute('content')?.trim(), '—');
    if (property) acc[property] = content;
    return acc;
  }, {});
}

const extractImages = (imgs) => {
  return Array.from(imgs).map(img => ({
    preview: img.src || '',
    full: img.dataset?.src || '',
    alt: img.alt || ''
  }));
}

const extractTags = (tags) => {
  const categories = { green: 'category', red: 'discount', blue: 'label' };
  return Array.from(tags).reduce((acc, tag) => {
    const group = categories[tag.className];
    if (group) acc[group].push(tag.textContent.trim());
    return acc;
  }, { category: [], discount: [], label: [] });
}

const extractProperties = (properties) => {
  return Array.from(properties).reduce((acc, li) => {
    const spans = li.querySelectorAll('span');
    if (spans.length >= 2) {
      acc[spans[0].textContent.trim()] = spans[1].textContent.trim();
    }
    return acc;
  }, {});
}

const extractSuggestions = (cards) => {
  return Array.from(cards).map(card => ({
    image: card.querySelector('img')?.src || '',
    name: card.querySelector('h3')?.textContent.trim() || '',
    price: String(utils.parseNumberFromStr(card.querySelector('b')?.textContent)),
    currency: utils.convertCurrency(card.querySelector('b')?.textContent.trim()[0]) || '',
    description: card.querySelector('p')?.textContent.trim() || ''
  }));
}

const extractReviews = (reviews) => {
  return Array.from(reviews).map(review => ({
    rating: review.querySelectorAll('.rating .filled').length,
    author: {
      avatar: review.querySelector('.author img')?.src || '',
      name: review.querySelector('.author span')?.textContent || ''
    },
    title: review.querySelector('.title')?.textContent.trim() || '',
    description: review.querySelector('p')?.textContent.trim() || '',
    date: utils.parseAndFormatDate(review.querySelector('.author i')?.textContent.trim())
  }));
}

export {extractKeywords, extractOpengraph, extractImages, extractTags, extractProperties, extractSuggestions, extractReviews}
