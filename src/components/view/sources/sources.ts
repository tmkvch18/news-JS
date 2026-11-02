import './sources.css';
import { SourceItem } from '../../../types';
import { getElement } from '../../../utils/dom';

class Sources {
    public draw(data: readonly SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getElement(document, '#sourceItemTemp', HTMLTemplateElement);

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            getElement(sourceClone, '.source__item-name', HTMLElement).textContent = item.name;
            getElement(sourceClone, '.source__item', HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement(document, '.sources', HTMLElement).append(fragment);
    }
}

export default Sources;
