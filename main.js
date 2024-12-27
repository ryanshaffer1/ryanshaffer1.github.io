// Custom Header on every page
class Header extends HTMLElement {
    constructor(props) {
        super(props);
    }
    connectedCallback() {
        this.innerHTML = `
        <section id="headerblock" class="headerblock">

            <a href="../index.html" id="name" class="no-underline">
                <div id="title-block">
                    <h1>Ryan Shaffer</h1>
                    <span id="subtitle">
                        <h4>makes things sometimes</h4>
                    </span>
                </div>
            </a>
            <a href="https://github.com/ryanshaffer1" id="github_link" class="no-underline">
                ryanshaffer1
                <img src="../common_resources/github-icon.png" id="github_img">
            </a>
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

// Automatically set software stats from VSCodeCounter file
async function readLOC() {
    // Read Markdown file with VSCodeCounter results
    let response = await fetch("resources/results.md");
    // Parse results to obtain the total lines of code and the breakdown by language
    let contents = await response.text();
    let split_contents = contents.split("##");
    let intro = split_contents[0];
    let lang_table = split_contents[1];
    total_loc = parseInt(intro.split("codes")[0].split(",").pop())
    lang_table = lang_table.split("\n").slice(3,-2)

    // Set HTML text element to show correct lines of code
    if (total_loc < 1000){
        var total_loc_string = (Math.round(total_loc/10)*10).toString();
    } else{
        var total_loc_string = (total_loc/1000).toFixed(1) + 'k';
    }
    document.getElementById("total_loc").textContent = total_loc_string;

    // Set HTML text element to show percentage of code by language
    var langList = document.getElementById("language-list");
    for (let i = 0; i<lang_table.length; i++){
        let language = lang_table[i].split('|')[1].trim();
        let loc = parseInt(lang_table[i].split('|')[3].replace(',',''))
        let percent_loc = Math.round(loc/total_loc*100)
        if (percent_loc > 3) {
            let newLang = document.createElement("li");
            newLang.textContent = language + ": " + percent_loc.toString() + "%"
            langList.appendChild(newLang);
        }
    }
}

if (document.body.id == "project"){
    window.onload = readLOC()
}

