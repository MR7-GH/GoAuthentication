// Function to create and show the custom alert
function showCustomAlert(message) {
  return new Promise((resolve) => {
    // Create the overlay element
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    // Create the alert box element
    const alertBox = document.createElement("div");
    alertBox.style.background = "#222";
    alertBox.style.padding = "20px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    alertBox.style.textAlign = "center";
    alertBox.style.color = "#0f0";
    alertBox.style.fontSize = '1.2em';
    // Create the message paragraph
    const messageParagraph = document.createElement("p");
    const headerBox = document.createElement("h2");
    messageParagraph.textContent = message;
    headerBox.textContent = "Success";
    // Create the OK button
    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.style.marginTop = "20px";
    okButton.style.padding = "10px 20px";
    okButton.style.background = "#0f0";
    okButton.style.color = "#000";
    okButton.style.border = "none";
    okButton.style.borderRadius = "4px";
    okButton.style.cursor = "pointer";

    // Add hover effect to the button
    okButton.addEventListener("mouseover", () => {
      okButton.style.background = "#0c0";
    });
    okButton.addEventListener("mouseout", () => {
      okButton.style.background = "#0f0";
    });

    // Append elements to the DOM
    alertBox.appendChild(headerBox);
    alertBox.appendChild(messageParagraph);
    alertBox.appendChild(okButton);
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);

    // Handle the OK button click
    okButton.addEventListener("click", () => {
      document.body.removeChild(overlay); // Remove the overlay
      resolve(); // Resolve the promise
    });
  });
}

// Attach event listener to the form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("testForm")
  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default submission
    await showCustomAlert("Your request sent for administration."); // Wait for custom alert confirmation
    window.location.href = "/Login"; // Redirect after confirmation
  });
});
