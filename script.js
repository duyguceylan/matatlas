get = id => document.getElementById(id);

function author_node(author) {
    var span = document.createElement("span");
    var a = document.createElement("a");
    var sup = document.createElement("sup");
    a.textContent = author.name;
    a.href = author.email;
    sup.textContent = author.footnote.map(String).join(",");
    //sup.textContent = author.affiliations.map(String).join(",");
    span.appendChild(a);
    span.appendChild(sup);
    return span
}

function affiliations_node(affiliations) {
    var span = document.createElement("span");
    span.innerHTML = affiliations.map((affiliation, index) => 
        "<sup>" + (index + 1).toString() + "</sup>" + affiliation
    ).join(", ");
    return span
}

function footnote_node(footnotes) {
    var span = document.createElement("span");
    span.innerHTML = footnotes.map((footnote, index) => 
        "<sup>" + (index) + "</sup>" + footnote
    ).join(", ");
    return span
}

function copy_bibtex() {
    var range = document.createRange();
    range.selectNode(get("bibtex"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}


function make_site(paper){
    document.title = paper.title;
    get("title").textContent = paper.title;
    //get("conference").textContent = paper.conference;
    paper.authors.map((author, index) => {
        node = author_node(author);
        get("author-list").appendChild(node);
        if(index == paper.authors.length - 1) return;
        node.innerHTML += ", "
    })
    get("affiliation-list").appendChild(affiliations_node(paper.affiliations));
    //get("abstract").textContent = paper.abstract;
    for(var button in paper.URLs) {
        node = get(button);
        url = paper.URLs[button];
        if(url == null) node.remove();
        else node.href = url;
    }
    //get("video").src = paper.URLs.youtube.replace('.be','be.com/embed/');
    get("copy-button").onclick = copy_bibtex;
}

function set_slider(root) {
    const slidesContainer = root.querySelector(".slides-container");
    const slide = root.querySelector(".slide");
    const prevButton = root.querySelector(".slide-arrow-prev");
    const nextButton = root.querySelector(".slide-arrow-next");
    nextButton.addEventListener("click", (event) => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });
}
sliders = document.getElementsByClassName("slider-wrapper")
for (var i = 0; i < sliders.length; i++) set_slider(sliders[i])

// Read JSON
make_site({
    "title": "MatAtlas: Text-driven Consistent Geometry Texturing and Material Assignment",
    "conference": "Arxiv",
    "authors": [
        {
            "name": "Duygu Ceylan",
            "email": "https://duygu-ceylan.com/",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
            "name": "Valentin Deschaintre",
            "email": "https://valentin.deschaintre.fr/",
            "affiliations": ["1"],
            "footnote": ["*"]
        },
        {
            "name": "Thibault Groueix",
            "email": "https://imagine.enpc.fr/~groueixt/",
            "affiliations": ["1"],
            "footnote": ["*"]
        },
        {
            "name": "Rosalie Martin",
            "email": "https://research.adobe.com/person/rosalie-martin/",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
            "name": "Chun-Hao Huang",
            "email": "https://paulchhuang.wixsite.com/chhuang",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
            "name": "Romain Rouffet",
            "email": "https://research.adobe.com/person/romain-rouffet/",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
            "name": "Vladimir Kim",
            "email": "http://www.vovakim.com/",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
            "name": "Gaëtan Lassagne",
            "email": "https://gaetanlassagne.wordpress.com/about/",
            "affiliations": ["1"],
            "footnote": [""]
        },
    ],
    "affiliations": ["Adobe"],
    "footnote": ["equal contribution"],
    "URLs": {
        "arxiv": "https://arxiv.org/abs/2404.02899"
    },
    "abstract": "We present MatAtlas, a method for consistent text-guided 3D model texturing. Following recent progress we leverage a large scale text-to-image generation model (e.g., Stable Diffusion) as a prior to texture a 3D model. We carefully design an RGB texturing pipeline that leverages a grid pattern diffusion, driven by depth and edges. By proposing a multi-step texture refinement process, we significantly improve the quality and 3D consistency of the texturing output. To further address the problem of baked-in lighting, we move beyond RGB colors and pursue assigning parametric materials to the assets. Given the high-quality initial RGB texture, we propose a novel material retrieval method capitalized on Large Language Models (LLM), enabling editabiliy and relightability. We evaluate our method on a wide variety of geometries and show that our method significantly outperform prior arts. We also analyze the role of each component through a detailed ablation study."
})
//fetch("./paper.json").then(response => response.json).then(json => make_site(json));
