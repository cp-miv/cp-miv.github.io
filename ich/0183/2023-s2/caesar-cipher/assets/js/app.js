document.addEventListener('DOMContentLoaded', function (e) {

    const k = document.querySelector('#k');
    const msgInput = document.querySelector('#msgInput');
    const msgOutput = document.querySelector('#msgOutput');

    [...document.querySelectorAll('[data-bs-toggle="popover"]')].forEach(e => new bootstrap.Popover(e, { 'html': true }));
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(e => new bootstrap.Tooltip(e));

    document.querySelectorAll('input[type="number"]').forEach(e => {
        e.addEventListener('input', () => {
            const value = Math.round(e.value);
            const min = e.min.trim().length > 0 ? Number(e.min) : NaN
            const max = e.max.trim().length > 0 ? Number(e.max) : NaN

            if (value < min) {
                e.value = min;
            }
            else if (value > max) {
                e.value = max
            }
            else if (e.value != value) {
                e.value = value;
                e.dispatchEvent(new Event('input'));
            }
        });
    });
});

function caesarCipher(message, key) {
    return [...message]
        .map(c => {
            let start, length;

            // Character strategies
            if (c.match('[0-9]'))
                [start, length] = [48, 10]
            else if (c.match('[A-Z]'))
                [start, length] = [65, 26]
            else if (c.match('[a-z]'))
                [start, length] = [97, 26]
            else
                return c;

            const n = key >= 0 ? key : length + (key % length);

            return String.fromCharCode(((c.charCodeAt(0) - start + n) % length) + start);
        })
        .join('');
}