WinJS solution using a content dialog as a modal-like and two ways binding an object, object to HTML and HTML back to object.
The listview.html and dropdown.html pages have calls to open a modal-like contentDialog winControl, passing a HTML file to be rendered inside a div.
This "modal" HTML received an binding object as options and bind the data to the page for updates, once the html element is changed the twoways binding pushes the change back to the main HTML page object that was bound to it (see Binding.Mode.TwoWays on the html elements).
The close button verifies if the "Say hello" button was pressed and Pages.Modal.IsValidated was set to true for validation purpose before closing the modal.
This example uses WinJS 3.1, jQuery 2.1.1 and TypeScript packages from nuGet on VS2013.
Feel free to fork this solution modify as needed.
