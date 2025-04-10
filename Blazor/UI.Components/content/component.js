// This file is to show how a library package may provide JavaScript interop features
// wrapped in a .NET API

window.exampleJsFunctions = {
  showPrompt: function (message) {
    return prompt(message, 'Type anything here');
  }
};

window.tagSelectorComponent = {
    getValue: function (element) {
        return element.value;
    },
    setValue: function(element, value) {
        element.value = value;
    },
    blur: function (element) {
        element.blur();
    }
};