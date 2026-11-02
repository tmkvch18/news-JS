import './sources.css';
import { CategoryFilter, SourceItem } from '../../../types';
import { getElement } from '../../../utils/dom';

class Sources {
    public draw(data: readonly SourceItem[]): void {
        this.drawSources(data);
        this.drawCategories(data);
    }

    private drawSources(data: readonly SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getElement(document, '#sourceItemTemp', HTMLTemplateElement);

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);
            const sourceItem = getElement(sourceClone, '.source__item', HTMLElement);

            getElement(sourceClone, '.source__item-name', HTMLElement).textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);
            sourceItem.setAttribute('data-category', item.category);

            fragment.append(sourceClone);
        });

        getElement(document, '.sources', HTMLElement).append(fragment);
    }

    private drawCategories(data: readonly SourceItem[]): void {
        const categoriesContainer = getElement(document, '.categories', HTMLElement);
        const categories: CategoryFilter[] = ['all', ...new Set(data.map((item) => item.category))];
        const fragment = document.createDocumentFragment();

        categories.forEach((category) => {
            const count = category === 'all' ? data.length : data.filter((item) => item.category === category).length;
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'category';
            button.setAttribute('data-category', category);
            button.textContent = `${category} (${count})`;

            fragment.append(button);
        });

        categoriesContainer.append(fragment);
        categoriesContainer.addEventListener('click', (e) => {
            if (!(e.target instanceof HTMLElement)) return;

            const selected = e.target.closest('.category')?.getAttribute('data-category');
            const category = categories.find((item) => item === selected);

            if (category) this.selectCategory(category);
        });

        this.selectCategory('all');
    }

    private selectCategory(category: CategoryFilter): void {
        document.querySelectorAll('.category').forEach((button) => {
            button.classList.toggle('category_active', button.getAttribute('data-category') === category);
        });

        document.querySelectorAll('.source__item').forEach((item) => {
            item.toggleAttribute('hidden', category !== 'all' && item.getAttribute('data-category') !== category);
        });

        getElement(document, '.sources', HTMLElement).scrollLeft = 0;
    }
}

export default Sources;
