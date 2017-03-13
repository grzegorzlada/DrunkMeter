/**
 *
 * Display toast notification
 * @export
 * @param {string} message Message text to display
 * @param {number} timeout Timeout im milisecons before toast disappears
 * @param {string} actionText (optional) Text for action link
 * @param {function} actionHandler (optional) Function to call upon action link click
 */
export function displayToast(message, timeout, actionText, actionHandler) {
    var snackbarContainer = document.querySelector('#toast-area');
    var data = {
        message: message,
        timeout: timeout
    };

    if (actionText !== null && actionHandler !== null) {
        data.actionText = actionText;
        data.actionHandler = actionHandler;
    }
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
