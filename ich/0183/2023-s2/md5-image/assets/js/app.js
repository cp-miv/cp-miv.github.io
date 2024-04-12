document.addEventListener('DOMContentLoaded', e => {

    [...document.querySelectorAll('[data-bs-toggle="popover"]')].forEach(e => new bootstrap.Popover(e, { 'html': true }));
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(e => new bootstrap.Tooltip(e));

    document.querySelectorAll('input.depends-background').forEach(e => {
        e.addEventListener('input', ev => {

            const successClass = 'bg-success-subtle';
            const failureClass = 'bg-warning-subtle';

            const currentClass = new Set([...document.querySelectorAll('.hash-output')].map(x => x.value)).size === 1
                ? successClass
                : failureClass;

            document.querySelectorAll('.picker').forEach(p => {
                p.classList.remove(successClass);
                p.classList.remove(failureClass);
                p.classList.add(currentClass);
            });

            if (currentClass === successClass) {
                document.querySelector('#alert-container .alert-success').classList.remove('d-none');
                document.querySelector('#alert-container .alert-warning').classList.add('d-none');
            }
            else {
                document.querySelector('#alert-container .alert-success').classList.add('d-none');
                document.querySelector('#alert-container .alert-warning').classList.remove('d-none');
            }
        });
    });

    document.querySelectorAll('.picker').forEach(e => {
        const dropZone = e.querySelector('.drop-zone');
        const previewImage = e.querySelector('.preview-image');
        const fileInput = e.querySelector('.file-input');
        const hashOutput = e.querySelector('.hash-output');

        dropZone.addEventListener('dragover', (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'copy';
        });

        dropZone.addEventListener('drop', async (ev) => {
            ev.stopPropagation();
            ev.preventDefault();

            await handleFile(ev.dataTransfer.files[0]);
        });

        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', async (e) => {
            await handleFile(e.target.files[0]);
        });

        async function handleFile(file) {
            previewImage.src = window.URL.createObjectURL(file)
            previewImage.hidden = false;

            hashOutput.value = await computeHash(file);
            hashOutput.dispatchEvent(new Event('input'));
        }
    });

    async function computeHash(file) {
        const data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', (ev) => resolve(ev.target.result));
            reader.addEventListener('error', () => reject('Impossible lire le fichier.'));
            reader.readAsArrayBuffer(file);
        });

        const wordData = CryptoJS.lib.WordArray.create(new Uint8Array(data));
        const hash = CryptoJS.MD5(wordData).toString();

        return hash;
    }
});