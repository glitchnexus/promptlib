import fs from 'fs';
import path from 'path';

class PromptLib {
    private prompts: Map<string, string>;
    private savePath?: string;

    constructor(savePath?: string) {
        this.prompts = new Map();
        this.savePath = savePath;
        
        // Eğer kayıt dosyası varsa, otomatik yükle
        if (savePath && fs.existsSync(savePath)) {
            this._loadFromFile();
        }
    }

    // Prompt kaydet
    save(key: string, prompt: string): this {
        if (!key || typeof key !== 'string') {
            throw new Error('Anahtar değeri string olmalıdır');
        }
        if (!prompt || typeof prompt !== 'string') {
            throw new Error('Prompt değeri string olmalıdır');
        }

        this.prompts.set(key, prompt);
        
        // Otomatik dosyaya kaydet
        if (this.savePath) {
            this._saveToFile();
        }
        return this;
    }

    // Prompt getir
    load(key: string): string | undefined {
        if (!key || typeof key !== 'string') {
            throw new Error('Anahtar değeri string olmalıdır');
        }
        return this.prompts.get(key);
    }

    // Birden fazla prompt kaydet
    saveMany(prompts: Record<string, string>): this {
        if (!prompts || typeof prompts !== 'object') {
            throw new Error('Promptlar obje formatında olmalıdır');
        }

        Object.entries(prompts).forEach(([key, prompt]) => {
            this.save(key, prompt);
        });
        return this;
    }

    // Prompt sil
    delete(key: string): boolean {
        if (!key || typeof key !== 'string') {
            throw new Error('Anahtar değeri string olmalıdır');
        }

        const deleted = this.prompts.delete(key);
        if (deleted && this.savePath) {
            this._saveToFile();
        }
        return deleted;
    }

    // Prompt var mı kontrol et
    has(key: string): boolean {
        if (!key || typeof key !== 'string') {
            throw new Error('Anahtar değeri string olmalıdır');
        }
        return this.prompts.has(key);
    }

    // Tüm promptları getir
    getAll(): Record<string, string> {
        return Object.fromEntries(this.prompts);
    }

    // Tüm promptları temizle
    clear(): this {
        this.prompts.clear();
        if (this.savePath) {
            this._saveToFile();
        }
        return this;
    }

    // Prompt sayısını getir
    count(): number {
        return this.prompts.size;
    }

    // Kayıt dosyası yolunu değiştir
    setSavePath(newPath: string): this {
        this.savePath = newPath;
        this._saveToFile();
        return this;
    }

    // Dosyaya kaydet
    private _saveToFile(): void {
        if (!this.savePath) return;

        try {
            const dir = path.dirname(this.savePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(this.savePath, JSON.stringify(Object.fromEntries(this.prompts), null, 2), 'utf8');
        } catch (error: any) {
            throw new Error(`Dosya kaydetme hatası: ${error?.message || 'Bilinmeyen hata'}`);
        }
    }

    // Dosyadan yükle
    private _loadFromFile(): void {
        if (!this.savePath || !fs.existsSync(this.savePath)) return;

        try {
            const data = JSON.parse(fs.readFileSync(this.savePath, 'utf8'));
            if (typeof data !== 'object') {
                throw new Error('Geçersiz dosya formatı');
            }
            this.prompts = new Map(Object.entries(data));
        } catch (error: any) {
            throw new Error(`Dosya okuma hatası: ${error?.message || 'Bilinmeyen hata'}`);
        }
    }
}

// Factory function
function createPromptLib(savePath?: string): PromptLib {
    return new PromptLib(savePath);
}

export default {
    create: createPromptLib
}; 