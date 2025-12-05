<script>
    let filename = 'beispiel.txt';
    let content = 'Hallo Welt!';

    async function save() {
        const result = await window.electronAPI.saveTextFile(filename, content);
        alert('Gespeichert unter: ' + result);
    }
</script>

<main>
    <h1>Textdatei erstellen</h1>

    <label>Dateiname:</label>
    <input bind:value={filename} />

    <label>Inhalt:</label>
    <textarea bind:value={content}></textarea>

    <button on:click={save}>Speichern</button>
</main>

<style>
    main {
        width: 400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        font-family: sans-serif;
    }
    textarea {
        height: 150px;
    }
</style>
