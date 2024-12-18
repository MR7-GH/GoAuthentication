// Function to fetch the tiles configuration from tiles.json and create the tiles
function createTilesFromJSON() {
    // Fetch the JSON configuration file
    fetch('tiles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load tiles.json: ${response.statusText}`);
            }
            return response.json();
        })
        .then(tileConfig => {
            // Find the container with class "tiles"
            const tilesContainer = document.querySelector('.tiles');

            // Ensure the container exists
            if (!tilesContainer) {
                console.error('Container with class "tiles" not found.');
                return;
            }

            // Iterate over each config and create the HTML structure
            tileConfig.forEach(tile => {
                // Create the article element
                const article = document.createElement('article');
                article.classList.add('tile');

                // Create the tile-header div
                const tileHeader = document.createElement('div');
                tileHeader.classList.add('tile-header');

                // Add the icon image
                const img = document.createElement('img');
                img.src = tile.icon;
                img.style.height = "40px";
                img.style.width = "40px";
                tileHeader.appendChild(img);

                // Add the title and description
                const h3 = document.createElement('h3');
                const title = document.createElement('span');
                title.textContent = tile.name;
                const description = document.createElement('span');
                description.innerHTML = tile.description; // Controlled input

                h3.appendChild(title);
                h3.appendChild(description);
                tileHeader.appendChild(h3);

                // Add the header to the article
                article.appendChild(tileHeader);

                // Create the "Go to service" link
                const link = document.createElement('a');
                link.href = "#"; // Placeholder link
                const linkText = document.createElement('span');
                linkText.textContent = "Go to service";
                const iconButton = document.createElement('span');
                iconButton.classList.add('icon-button');
                const icon = document.createElement('i');
                icon.classList.add('ph-caret-right-bold');
                iconButton.appendChild(icon);

                link.appendChild(linkText);
                link.appendChild(iconButton);

                // Add the link to the article
                article.appendChild(link);

                // Append the article to the tiles container
                tilesContainer.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Error loading or parsing tiles.json:', error);
        });
}

// Call the function to create the tiles when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createTilesFromJSON);
