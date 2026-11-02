import './news.css';
import { Article } from '../../../types';
import { getElement } from '../../../utils/dom';

class News {
    public draw(data: readonly Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = getElement(document, '#newsItemTemp', HTMLTemplateElement);

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            if (idx % 2) getElement(newsClone, '.news__item', HTMLElement).classList.add('alt');

            getElement(newsClone, '.news__meta-photo', HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.svg'
            })`;
            getElement(newsClone, '.news__meta-author', HTMLElement).textContent = item.author || item.source.name;
            getElement(newsClone, '.news__meta-date', HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement(newsClone, '.news__description-title', HTMLElement).textContent = item.title;
            getElement(newsClone, '.news__description-source', HTMLElement).textContent = item.source.name;
            getElement(newsClone, '.news__description-content', HTMLElement).textContent = item.description;
            getElement(newsClone, '.news__read-more a', HTMLElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = getElement(document, '.news', HTMLElement);
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
