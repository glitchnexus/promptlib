# PromptLib

Prompt yönetimi için basit ve kullanışlı bir kütüphane.

## Kurulum

```bash
npm install promptlib
```

## Kullanım

```typescript
import promptlib from 'promptlib';

// Yeni bir PromptLib örneği oluştur (otomatik kayıt ile)
const lib = promptlib.create("./prompts.json");

// Prompt kaydet
lib.save("selam", "Merhaba! Ben bir yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?");

// Birden fazla prompt kaydet
lib.saveMany({
    "hoşgeldin": "Hoş geldiniz! Size nasıl yardımcı olabilirim?",
    "görüşürüz": "Görüşmek üzere! Başka sorunuz olursa yine beklerim."
});

// Prompt yükle
const selamPrompt = lib.load("selam");
console.log(selamPrompt);
// Çıktı: "Merhaba! Ben bir yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?"

// Prompt var mı kontrol et
if (lib.has("selam")) {
    console.log("Selam promptu mevcut!");
}

// Prompt sil
lib.delete("görüşürüz");

// Tüm promptları getir
const allPrompts = lib.getAll();

// Prompt sayısını öğren
const count = lib.count();
console.log(`Toplam ${count} prompt var`);

// Tüm promptları temizle
lib.clear();

// Kayıt dosyası yolunu değiştir
lib.setSavePath("./yeni/konum/prompts.json");
```

## Özellikler

- 💾 Otomatik dosya kayıt sistemi
- 🚀 Basit ve kullanışlı API
- 📦 Toplu prompt yükleme
- 🗑 Prompt varlık kontrolü
- 🔢 Prompt sayacı
- 🗑️ Kolay silme ve temizleme
- 📁 Esnek dosya konumu
- ⚡ Zincir metodlar (method chaining)
- 🛡️ Hata kontrolü ve güvenlik

## Lisans

Bu proje özel bir lisans altında lisanslanmıştır. Detaylar için LICENSE dosyasına bakın. 