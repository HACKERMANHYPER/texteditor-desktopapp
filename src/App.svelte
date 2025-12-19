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

<main
    class="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
>
    <div class="w-full max-w-2xl">
        <!-- Header -->
        <div class="mb-8 text-center">
            <h1
                class="mb-2 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent"
            >
                Text Editor
            </h1>
            <p class="text-gray-400">Erstelle und öffne Textdateien</p>
        </div>

        <!-- Card Container -->
        <div
            class="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl"
        >
            <!-- Action Buttons -->
            <div class="mb-8 flex gap-4">
                <button
                    on:click={open}
                    class="flex-1 transform rounded-lg bg-linear-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:from-blue-600 hover:to-blue-700"
                >
                    📁 Datei öffnen
                </button>
                <button
                    on:click={save}
                    class="flex-1 transform rounded-lg bg-linear-to-r from-green-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:from-green-600 hover:to-green-700"
                >
                    💾 Speichern
                </button>
            </div>

            <!-- Filename Input -->
            <div class="mb-6">
                <label
                    for="filename"
                    class="mb-2 block text-sm font-semibold text-gray-300"
                >
                    Dateiname:
                </label>
                <input
                    id="filename"
                    type="text"
                    bind:value={filename}
                    class="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    placeholder="beispiel.txt"
                />
            </div>

            <!-- Content Textarea -->
            <div class="mb-6">
                <label
                    for="content"
                    class="mb-2 block text-sm font-semibold text-gray-300"
                >
                    Inhalt:
                </label>
                <textarea
                    id="content"
                    bind:value={content}
                    class="h-64 w-full resize-none rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 font-mono text-sm text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    placeholder="Gib deinen Text ein..."
                ></textarea>
            </div>

            <!-- Character Count -->
            <div class="text-right text-sm text-gray-400">
                {content.length} Zeichen
            </div>
        </div>
    </div>
</main>
