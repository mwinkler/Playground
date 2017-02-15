
// interface View extends HTMLElement {
//     createdCallback(): void;
//     attachedCallback(): void;
//     detachedCallback(): void;
//     attributeChangedCallback(attrName: string, oldVal: string, newVale: string): void;
// }

interface Document {
    registerElement(...arg: any[]): any;
}