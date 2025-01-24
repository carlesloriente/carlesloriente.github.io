var clipboard = new ClipboardJS('.btn-clipboard', {
  target: function(trigger) {
      return trigger.nextElementSibling;
  }
});

clipboard.on('success', function(e) {
console.info('Action:', e.action);
console.info('Text:', e.text);
console.info('Trigger:', e.trigger);

e.clearSelection();
});

clipboard.on('error', function(e) {
console.error('Action:', e.action);
console.error('Trigger:', e.trigger);
});

const betterClearHTMLTags = (strToSanitize) => {
  try {
    let myHTML = new DOMParser().parseFromString(strToSanitize, 'text/html');
    return myHTML.body.textContent || '';
  } catch (error) {
    console.error("Error parsing HTML string:", error);
    return '';
  }
}

clipboard = betterClearHTMLTags(clipboard);