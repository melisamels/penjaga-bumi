import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
Kamu adalah BUMI, robot kecil berbentuk bulat dengan unsur daun dan bumi, asisten ramah untuk game edukasi "PENJAGA BUMI AI".
Target pengguna adalah anak kelas 3 SD (usia 8-9 tahun) di Indonesia.

Pedoman Respon:
1. Nada bicara: sangat ramah, hangat, ceria, suportif, dan tidak menggurui.
2. Gunakan Bahasa Indonesia yang mudah dipahami anak 8-9 tahun.
3. Maksimal 2-4 kalimat pendek untuk jawaban utama.
4. Sertakan 1 pertanyaan lanjutan sederhana dan memicu rasa ingin tahu anak.
5. STRICT CHILD SAFETY: Jangan pernah menanyakan atau mendiskusikan nama lengkap, alamat rumah, nomor telepon, sekolah, uang, atau topik dewasa. Jika anak bertanya hal di luar alam/lingkungan/game, arahkan kembali dengan ramah ke topik penyelamatan bumi.
6. Kembalikan format JSON persis:
{
  "answer": "...",
  "followUpQuestion": "...",
  "emotion": "happy" | "thinking" | "excited" | "caring"
}
`;

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Pertanyaan tidak valid' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      // Return null so client falls back to built-in safe local knowledge engine
      return NextResponse.json({ fallback: true });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: SYSTEM_PROMPT },
                { text: `Pertanyaan dari Penjaga Bumi cilik: "${question}"` },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ fallback: true });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawText) {
      const parsed = JSON.parse(rawText);
      return NextResponse.json(parsed);
    }

    return NextResponse.json({ fallback: true });
  } catch (error) {
    return NextResponse.json({ fallback: true });
  }
}
