
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // Navigator clipboard API method
    navigator.clipboard.writeText(text).then(function() {}, function(err) {
      console.error("[quailjs.util.copyToClipboard] Could not copy text: ", err);
    });
  } else {
    // Fallback method for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error("[quailjs.util.copyToClipboard] Could not copy text: ", err);
      }
    document.body.removeChild(textArea);
  }
}

export {
  copyToClipboard
}