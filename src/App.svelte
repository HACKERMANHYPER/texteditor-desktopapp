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

<main class="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 mb-2">
                Text Editor
            </h1>
            <p class="text-gray-400">Erstelle und öffne Textdateien</p>
        </div>

        <!-- Card Container -->
        <div class="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
            <!-- Action Buttons -->
            <div class="flex gap-4 mb-8">
                <button 
                    on:click={open}
                    class="flex-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:cursor-pointer shadow-lg"
                >
                    📁 Datei öffnen
                </button>
                <button 
                    on:click={save}
                    class="flex-1 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:cursor-pointer shadow-lg"
                >
                    💾 Speichern
                </button>
            </div>

            <!-- Filename Input -->
            <div class="mb-6">
                <label for="filename" class="block text-sm font-semibold text-gray-300 mb-2">
                    Dateiname:
                </label>
                <input 
                    id="filename"
                    type="text"
                    bind:value={filename}
                    class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
                    placeholder="beispiel.txt"
                />
            </div>

            <!-- Content Textarea -->
            <div class="mb-6">
                <label for="content" class="block text-sm font-semibold text-gray-300 mb-2">
                    Inhalt:
                </label>
                <textarea 
                    id="content"
                    bind:value={content}
                    class="w-full h-64 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 resize-none font-mono text-sm"
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
