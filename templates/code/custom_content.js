// Get the current slide
function getCurrentSlide() {
    result = document.querySelector('section.slide.present');
    if (!result) {
        result = document.querySelector('section.present');
    }
    return result;
}

// Get the current chapter title
function getCurrentChapter() {
    result = document.querySelector('section.stack.present');
    if (!result) {
        result = document.querySelector('.present');
    }
    return result;
}

// Checks if we are currently in a title slide
function isTitleSlide(slide) {
    return slide.querySelector('h1') !== null;
}

// Get the current chapter title
function getCurrentChapterTitle(chap) {
    const h1 = chap.querySelector('h1');
    return h1 ? h1.textContent : '.';
}

// Function to get the document title
function getDocumentTitle() {
    const subtitleElement = document.getElementsByClassName("title")[0];
    return subtitleElement ? subtitleElement.textContent : "";
}

// Function to get the document subtitle
function getDocumentSubtitle() {
    const subtitleElement = document.getElementsByClassName("subtitle")[0];
    return subtitleElement ? subtitleElement.textContent : "";
}

// Function to update the footer with the current chapter, title, and subtitle
function updateFooter(text) {
    const footer = document.querySelector('div.footer p');
    if (footer) {
        footer.innerHTML = text;
    }
}

// Main function to add custom footer
function addCustomFooterDynamic() {
    const slide = getCurrentSlide();
    const chap = getCurrentChapter();

    const title = getDocumentTitle();
    const subtitle = getDocumentSubtitle();
    const currentChapter = getCurrentChapterTitle(chap);

    if (isTitleSlide(slide)) {
        updateFooter(title + " - " + subtitle);
    } else {
        updateFooter(currentChapter);
    }
}

function addCustomFooter() {
    const title = getDocumentTitle();
    const subtitle = getDocumentSubtitle();

    // Check if the footer has already changed
    const footer = document.querySelector('div.footer p');

    if (footer && footer.textContent.includes(subtitle)) {
        return;
    } else if (footer) {
        updateFooter(footer.textContent + " - " + title + " - " + subtitle);
    } else {
        updateFooter(title + " - " + subtitle);
    }

}


////////////////////////////////////////////////////////////////////////////////

// Creates a div to the ToC in the body
function createTocDiv() {
    const tocDiv = document.createElement('div');
    tocDiv.className = 'dynamic-toc';
    tocDiv.id = 'dynamic-toc';

    document.querySelector('div.reveal.slide').appendChild(tocDiv);
}

// Get all level 1 headers (h1 elements) from the slides
function getChapterTitles() {
    let titles = [];
    document.querySelectorAll('.reveal .slides section.title-slide').forEach((slide) => {
        let h1 = slide.querySelector('h1');
        if (h1) {
            titles.push(h1.innerText);
        }
    });
    return titles;
}

// Update the ToC with the titles of the chapters
function populateMainToC () {
    const chapterTitles = getChapterTitles();
    let tocDiv = document.getElementById('dynamic-toc');

    // Create and append each title to the ToC
    chapterTitles.forEach(title => {
        const titleElement = document.createElement('div');
        titleElement.className = 'toc-main-title toc-div';
        titleElement.innerText = title;
        tocDiv.appendChild(titleElement);
    });
}

function updateDynamicToC () {
    const current_chapter = getCurrentChapter();
    const current_chapter_title = getCurrentChapterTitle(current_chapter);

    document.querySelectorAll('.toc-div').forEach((titleElement) => {
        if (titleElement.textContent == current_chapter_title) {
            titleElement.classList.add('toc-highlight');
        } else {
            titleElement.classList.remove('toc-highlight');
        }
    });
}


// Function to toggle the visibility of the ToC
function toggleToC() {
    document.querySelectorAll('.dynamic-toc').forEach((toc) => {
        if (toc.style.display === 'none' || toc.style.display === '') {
            toc.style.display = 'flex';
        } else {
            toc.style.display = 'none';
        }
    });
}

////////////////////////////////////////////////////////////////////////////////

function fillCustomCallouts() {
    fillCustomCallout("dummy", "For dummies");
    fillCustomCallout("exercise", "Exercise");
    fillCustomCallout("theorem", "Theorem");
}

function fillCustomCallout(name, title) {
    document.querySelectorAll(`.callout-${name}`).forEach((div) => {
        // Get the internal <p> element
        const p = div.querySelector('p');

        // Create header div
        let div_header = document.createElement('div');
        div_header.classList.add(`callout-${name}-header`);
        div_header.innerHTML = `<p><strong>${title}</strong></p>`;

        // Create a new div with class 'callout-content'
        let div_content = document.createElement('div');
        div_content.classList.add('callout-content');
        div_content.classList.add(`callout-${name}-content`);
        div_content.appendChild(p);

        // Create new whole div and append header and content
        let newDiv = document.createElement('div');
        newDiv.classList.add('callout-body');
        newDiv.appendChild(div_header);
        newDiv.appendChild(div_content);

        // Replace the old content with the new div
        div.innerHTML = '';  // Clear the original content
        div.appendChild(newDiv);  // Insert the new structure
        div.classList.add('callout-style-default');
        div.classList.add('callout-titled');
        div.classList.add('callout');
        div.classList.add(`callout-${name}`);
        div.classList.add(`.callout-${name}`);
    });
}

////////////////////////////////////////////////////////////////////////////////

function forceInheritedTags() {
    document.querySelectorAll('.reveal section.stack').forEach((section) => {

        // Get first section, as it is the title
        const title = section.querySelector('section.title-slide');

        // If there is no title, skip
        if (!title) {
            return;
        }

        // Find every class of title that starts with inh_
        const inhClasses = title.className.split(' ').filter(c => c.startsWith('inh_'));

        // If there are inh_ values, add them to every section forward
        section.querySelectorAll('section').forEach((subSection) => {
            inhClasses.forEach(c => subSection.classList.add(c));
        });
    });
}

////////////////////////////////////////////////////////////////////////////////

function wrapSectionContent() {
    // Select all sections with the class "slide level2"
    const sections = document.querySelectorAll('section.slide.level2');

    sections.forEach(section => {
        // Create a new div element with class "slide-content"
        const slideContentDiv = document.createElement('div');
        slideContentDiv.className = 'slide-content';

        // Move all child nodes of the section into the new div
        while (section.firstChild) {
            slideContentDiv.appendChild(section.firstChild);
        }

        // Append the new div to the section
        section.appendChild(slideContentDiv);
    });
}

////////////////////////////////////////////////////////////////////////////////

function formatAdvanceTitle() {

    // Get first section, as it is the title
    const title = document.querySelector('#title-slide');

    // If there is no title, skip
    if (!title) {
        return;
    }

    const h1 = title.querySelector('h1');
    if (!h1) return;

    // Find a <code> element inside the h2 that contains "[Advanced]"
    const codeEl = h1.querySelector("code");
    if (codeEl && codeEl.textContent.includes("[Advanced]")) {

        // Add them to every section forward
        document.querySelectorAll('section').forEach((subSection) => {
            subSection.classList.add("custom-advanced");
        });
    }
}

function formatAdvanceChapters() {

    document.querySelectorAll('.reveal section.stack').forEach((section) => {

        // Get first section, as it is the title
        const title = section.querySelector('section.title-slide');

        // If there is no title, skip
        if (!title) {
            return;
        }

        const h1 = section.querySelector('h1');
        if (!h1) return;

        // Find a <code> element inside the h2 that contains "[Advanced]"
        const codeEl = h1.querySelector("code");
        if (codeEl && codeEl.textContent.includes("[Advanced]")) {

            // Remove the whole code element
            codeEl.remove();

            // Add to section the class "custom-advanced"
            section.classList.add("custom-advanced");

            // Add them to every section forward
            section.querySelectorAll('section').forEach((subSection) => {
                subSection.classList.add("custom-advanced");
            });
        }

    });
}

function formatAdvanceSlides() {
    // Select all sections with the class "slide level2"
    const sections = document.querySelectorAll('section.slide.level2');

    sections.forEach(section => {

        const h2 = section.querySelector('h2');
        if (!h2) return;

        // Find a <code> element inside the h2 that contains "[Advanced]"
        const codeEl = h2.querySelector("code");
        if (codeEl && codeEl.textContent.includes("[Advanced]")) {

            // Remove the whole code element
            codeEl.remove();

            // Add to section the class "custom-advanced"
            section.classList.add("custom-advanced");
        }
    });
}

function customAdvanceSlides() {

    // Select all sections with the class "slide level2 ot type custom-advanced"
    document.querySelectorAll('section.slide.level2.custom-advanced').forEach((section) => {

        // Create container for icon + tooltip
        const tooltipWrapper = document.createElement("div");
        tooltipWrapper.className = "advanced-tooltip";

        // The icon (use your own image)
        const icon = document.createElement("img");
        icon.src = "../../templates/images/icon-advanced_color.png";
        icon.alt = "Advanced icon";
        icon.className = "advanced-icon";

        tooltipWrapper.appendChild(icon);
        section.appendChild(tooltipWrapper);
    });

    // Select all sections with the class "slide level2 ot type custom-advanced"
    document.querySelectorAll('section.title-slide.custom-advanced').forEach((section) => {

        // Create container for icon + tooltip
        const tooltipWrapper = document.createElement("div");
        tooltipWrapper.className = "advanced-tooltip-title";

        // The icon (use your own image)
        const icon = document.createElement("img");
        icon.src = "../../templates/images/icon-advanced_color.png";
        icon.alt = "Advanced icon";
        icon.className = "advanced-icon-title";

        tooltipWrapper.appendChild(icon);
        section.appendChild(tooltipWrapper);
    });
}

////////////////////////////////////////////////////////////////////////////////

// Reformat event when loading the page
window.addEventListener("load", (event) => {
    addCustomFooter();
    updateDynamicToC();
});

// Reformat event when changing slides
Reveal.on('slidechanged', function(event) {
    addCustomFooter();
    updateDynamicToC();
});

// Reformat event when loading the first time
document.addEventListener('DOMContentLoaded', (event) => {
    // Add custom image
    formatAdvanceTitle();
    formatAdvanceChapters();
    formatAdvanceSlides();
    customAdvanceSlides();

    // Other customizations
    createTocDiv();
    populateMainToC();
    forceInheritedTags();
    fillCustomCallouts();
    wrapSectionContent();

});

// Reformat event "t" key pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 't' || event.key === 'T') {
        toggleToC();
    }
});
