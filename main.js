// Custom Header on every page
class Header extends HTMLElement {
    constructor(props) {
        super(props);
    }
    connectedCallback() {
        this.innerHTML = `
        <section id="headerblock" class="headerblock">
            <div class="menubar">
                <a href="index.html" id="name" class="no-underline">
                    <h1>Ryan Shaffer</h1>
                </a>
                <a href="https://github.com/ryanshaffer1" id="github_link" class="no-underline">
                    <img src="common_resources/github-icon.png" id="github_img">
                </a>
            </div>
        </section>  
        `;
    }
}
customElements.define('custom-header', Header);

// Custom Footer on every page
class Footer extends HTMLElement {
    constructor(props) {
        super(props);
    }
    connectedCallback() {
        this.innerHTML = `
        <section id="footerblock" class="footerblock">
            <div class="footer">
            </div>
        </section>  
        `;
    }
}
customElements.define('custom-footer', Footer);

// Show embedded content after it is loaded (prevents jumping to embedded content)
// window.onload = function ()
// {
//     $("#embedded-content").show();
//     document.getElementById("headerblock").focus();
// }