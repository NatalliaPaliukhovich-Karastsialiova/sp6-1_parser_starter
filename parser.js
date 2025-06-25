import * as extractor from './extractors.js';
import {substrBeforeSymbol, parseNumberFromStr, convertCurrency} from './utils.js';


export default function parsePage() {
  const html = document.querySelector('html');
  const description = document.querySelector('meta[name="description"]');
  const keywords = document.querySelector('meta[name="keywords"]');
  const ogMetaTags = document.querySelectorAll('meta[property^="og:"]');
  const product = document.querySelector('.product');
  const imgs = document.querySelectorAll('[data-src]');
  const btnLike = document.querySelector('.like');
  const mainTitle = document.querySelector('h1');
  const tags = document.querySelectorAll('.tags span');
  const price = document.querySelector('.price')?.childNodes[0];
  const oldPrice = document.querySelector('.price span');
  const properties = document.querySelectorAll('.properties li');
  const fullDesc = document.querySelector('.description');
  const cards = document.querySelectorAll('.suggested .container .items article');
  const reviews = document.querySelectorAll('.reviews .container .items article');

  const priceValue = parseNumberFromStr(price?.nodeValue);
  const oldPriceValue = parseNumberFromStr(oldPrice?.textContent);


  return {
      meta: {
        language: html?.getAttribute('lang') || '',
        title: substrBeforeSymbol(document.title, '—'),
        description: description?.getAttribute('content') || '',
        keywords: extractor.extractKeywords(keywords),
        opengraph: extractor.extractOpengraph(ogMetaTags)
      },
      product: {
        id: product?.dataset?.id || '',
        images: extractor.extractImages(imgs),
        isLiked: btnLike?.classList.contains('active') || false,
        name: mainTitle?.textContent.trim() || '',
        tags: extractor.extractTags(tags),
        price: priceValue,
        oldPrice: oldPriceValue,
        discount: (oldPriceValue - priceValue) || 0,
        discountPercent: oldPriceValue
                          ? `${(100 - (100 * priceValue / oldPriceValue)).toFixed(2)}%`
                          : '0.00%',
        currency: convertCurrency(oldPrice?.textContent[0]) || '',
        properties: extractor.extractProperties(properties),
        description: fullDesc.innerHTML.replaceAll(' class="unused"', '').trim() || ''
      },
      suggested: extractor.extractSuggestions(cards),
      reviews: extractor.extractReviews(reviews)
  }
}
