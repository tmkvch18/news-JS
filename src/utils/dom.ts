export function getElement<T extends Element>(parent: ParentNode, selector: string, type: new () => T): T {
    const element = parent.querySelector(selector);

    if (!(element instanceof type)) {
        throw new Error(`Element "${selector}" not found`);
    }

    return element;
}
