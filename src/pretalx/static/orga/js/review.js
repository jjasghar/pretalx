/*
 * When a radio button is selected (or has been selected from the start):
 * add the active class to its unmark-radio element
 * Count both classes of radio buttons and update counters
 * When .unmark-radio is clicked, deactivate its neighbored labels and update count
 */
let count = {accept: 0, reject: 0}
const acceptLabel = document.querySelector('#acceptCount')
const rejectLabel = document.querySelector('#rejectCount')

let updateCount = () => {
    count.accept = 0;
    count.reject = 0;
    document.querySelectorAll('.review-table .reject input[type=radio]').forEach((element) => {
        if (element.checked) {
            count.reject += 1;
            element.parentElement.parentElement.querySelector('.unmark-radio').classList.add('active')
        }
    });
    document.querySelectorAll('.review-table .accept input[type=radio]').forEach((element) => {
        if (element.checked) {
            count.accept += 1;
            element.parentElement.parentElement.querySelector('.unmark-radio').classList.add('active')
        }
    });
    if (!(count.accept || count.reject)) {
        document.querySelector('#submitBar').classList.add('d-none')
    } else {
        document.querySelector('#submitBar').classList.remove('d-none')
    }
    if (acceptLabel.firstChild) acceptLabel.removeChild(acceptLabel.firstChild)
    acceptLabel.appendChild(document.createTextNode(count.accept))
    if (rejectLabel.firstChild) rejectLabel.removeChild(rejectLabel.firstChild)
    rejectLabel.appendChild(document.createTextNode(count.reject))
}
document.querySelectorAll('.review-table .radio input[type=radio]').forEach((element) => {
    element.addEventListener('click', (ev) => {
        updateCount();
    })
})

document.querySelectorAll('.review-table .unmark-radio').forEach((element) => {
    element.addEventListener('click', (ev) => {
        ev.target.parentElement.parentElement.querySelectorAll('input[type=radio]').forEach((rad) => {rad.checked = false})
        ev.target.parentElement.classList.remove('active')
        updateCount();
    })
})
document.querySelector('#submitText').classList.remove('d-none')

updateCount();
