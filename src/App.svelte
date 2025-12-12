<script>
    import './app.css';

    let filename = 'beispiel.txt';
    let content = 'Hallo Welt!';

    async function save() {
        const result = await window.electronAPI.saveTextFile(filename, content);

        alert('Gespeichert unter: ' + result);
    }

    async function open() {
        const result = await window.electronAPI.dialogOpenFile();

        if (result) {
            filename = result.filename;
            content = result.content;
        }
    }
</script>

<main>
    <h1>Textdatei erstellen/öffnen</h1>
    <button on:click={open}>Datei öffnen</button>
    <div>Dateiname:</div>
    <input bind:value={filename} />

    <div>Inhalt:</div>
    <textarea bind:value={content}></textarea>

    <button on:click={save}>Speichern</button>
</main>
