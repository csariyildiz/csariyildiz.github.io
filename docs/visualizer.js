const htmlInput = document.getElementById("htmlInput");
const outputFrame = document.getElementById("outputFrame");

// Update the iframe's content as the user types in the textarea
htmlInput.addEventListener("input", () => {
  const content = htmlInput.value;
  const frameDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

  frameDoc.open();
  frameDoc.write(content);
  frameDoc.close();
});
