// Load data from project pages into Projects gallery
if (document.body.id == "index"){
    window.onload = generate_project_gallery();
}

// Builds Project Gallery from HTML pages
async function generate_project_gallery(){
    let project_pages = ["fantasy-projections/index.html", 
                         "led-matrix/index.html"];
    for (let i=0; i<project_pages.length; i++){
        let project_page = project_pages[i];
        newProject = append_blank_project_to_gallery();
        await load_project_data_to_gallery(project_page, newProject);    
    }
}

// Generates a blank grid space for a project
function append_blank_project_to_gallery(){
    let gallery = document.getElementById("gallery-grid");
    let newProject = document.createElement("div");
    newProject.classList.add("work_grid_cell")
    newProject.innerHTML = `
            <figure class="model">
                <a id="image_link" class="link_with_icon_index">
                    <img id="logo_image" class="logo_image">
                </a>
            </figure>
            <figcaption class="model--caption overlay">
                <div>
                    <h3 class="model-hed">
                        <a id="project-title" class="model-hed-link"></a>
                    </h3>    
                </div>
                <div class="resizable">
                    <p id="short-description">
                    </p>    
                </div>
                <div class="resizable">
                    <p id="timeline">
                    </p>    
                </div>
                <div class="resizable">
                    <ul id="tags-list" class="tags-list">
                    </ul>    
                </div>
            </figcaption>
    `
    gallery.appendChild(newProject);
    return newProject
}

// Sets data in projects gallery to match data from project page
async function load_project_data_to_gallery(project_page, newProject){
    project_folder = project_page.split('/')[0] + '/';
    // Obtain html from file
    let html = await html_from_filename(project_page);
    // Set HTML link for image and title in projects gallery to point to project page
    newProject.querySelector("#image_link").href = project_page;
    newProject.querySelector("#project-title").href = project_page;
    // Get Project Title and set the same in projects gallery
    let project_title = html.querySelector("#project_title").textContent;
    newProject.querySelector("#project-title").textContent = project_title;
    // Get source of project logo and set the same in projects gallery
    let logo_image = html.querySelector("#project_logo");
    let logo_image_src = logo_image.attributes['src'].value;
    newProject.querySelector("#logo_image").src = project_folder+logo_image_src;
    // Get short description and set the same in projects gallery
    let description = html.querySelector("#short-description").textContent;
    newProject.querySelector("#short-description").textContent = description;
    // Get project timeline and set in projects gallery
    let timeline = html.querySelector("#timeline").textContent;
    newProject.querySelector("#timeline").textContent = timeline;
    // Get project tags and set them in projects gallery
    let proj_tags_html = html.querySelector("#tags-list").outerHTML
    newProject.querySelector("#tags-list").outerHTML = proj_tags_html
}

// Parses HTML from local file
async function html_from_filename(project_page) {
    let response = await fetch(project_page);
    let contents = await response.text();
	let parser = new DOMParser();
	let doc = parser.parseFromString(contents, 'text/html');
	return doc.body;
}
