document.addEventListener('DOMContentLoaded', function (e) {

    const g = document.querySelector('#g');
    const n = document.querySelector('#n');
    const x = document.querySelector('#x');
    const y = document.querySelector('#y');
    const a = document.querySelector('#a');
    const b = document.querySelector('#b');
    const k = document.querySelector('#k');

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
