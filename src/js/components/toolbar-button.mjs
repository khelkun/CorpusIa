/**
 * attributes:
 *      - String title      The title of the button
 *      - String iconClass  the classes to set for the icon
 */
export default class ToolbarButton extends HTMLButtonElement {
    constructor() {
        super();
        const classes = "btn btn-primary";
        this.classList.add(...classes.split(' '));

    }
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
    }


    static get observedAttributes() {
        return ['title', 'iconClass'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const attributes = {};
        // n.b: this.attributes is not an array but a NamedNodeMap
        for (const attr of this.attributes) {
            attributes[attr.name] = attr.value
        }
        const { title, iconClass } = attributes;

        const iconHTML = iconClass ? `<i class="${iconClass}"></i>` : '';
        this.innerHTML = `${iconHTML}${title}`;
    }
}

customElements.define('corpus-ia-toolbar-button', ToolbarButton, {extends: 'button'});