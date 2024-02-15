import { Offcanvas } from 'bootstrap';

/**
 * attributes:
 */
export default class OffCanvas extends HTMLElement {
     bsOffcanvas;

    constructor() {
        super();

        const classes = "offcanvas offcanvas-start";
        this.classList.add(...classes.split(' '));
        this.setAttribute('tabindex', '-1');
        this.bsOffcanvas = new Offcanvas(this);
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
    }

    show() {
        this.bsOffcanvas.show();
    }

    hide() {
        this.bsOffcanvas.hide();
    }

    toggle() {
        this.bsOffcanvas.toggle();
    }
}

customElements.define('corpus-ia-offcanvas', OffCanvas);