// AI Service Abstraction for BUMI Companion
// Supports offline rule-based knowledge engine + optional Next.js API route

export interface AskBumiResponse {
  answer: string;
  followUpQuestion?: string;
  emotion: 'happy' | 'thinking' | 'excited' | 'caring';
}

const PRESET_KNOWLEDGE: {
  keywords: string[];
  answer: string;
  followUp: string;
  emotion: 'happy' | 'thinking' | 'excited' | 'caring';
}[] = [
  {
    keywords: ['laut', 'kotor', 'kenapa laut', 'pantai kotor'],
    answer: 'Laut adalah rumah bagi jutaan ikan, terumbu karang, dan penyu lucu! Kalau laut kotor oleh plastik, hewan-hewan bisa sakit karena mengira plastik itu makanan.',
    followUp: 'Menurutmu, apa yang bisa kita lakukan supaya plastik tidak sampai terhanyut ke laut?',
    emotion: 'caring',
  },
  {
    keywords: ['pohon', 'menanam', 'kenapa harus menanam', 'hutan'],
    answer: 'Pohon itu seperti pabrik oksigen raksasa yang sejuk! Pohon menyerap udara kotor dan mengeluarkan udara segar yang kita hirup setiap hari.',
    followUp: 'Pernahkah kamu berteduh di bawah pohon rindang saat matahari sedang terik?',
    emotion: 'happy',
  },
  {
    keywords: ['plastik', 'penyu', 'bahaya plastik', 'kenapa plastik'],
    answer: 'Penyu sangat suka memakan ubur-ubur yang melayang di air. Kantong plastik yang terapung di laut terlihat persis seperti ubur-ubur, sehingga penyu bisa tersedak jika memakannya.',
    followUp: 'Kira-kira apa pengganti kantong plastik yang bisa kita pakai berulang kali saat belanja?',
    emotion: 'thinking',
  },
  {
    keywords: ['sungai', 'sungai kotor', 'air bersih', 'ikan sungai'],
    answer: 'Air sungai yang jernih mengalir menyiram sawah tempat padi tumbuh dan menjadi tempat minum hewan-hewan di alam liar. Jika sungai tercemar, tanaman dan ikan bisa mati.',
    followUp: 'Bagaimana cara sederhana kita agar saluran air di sekitar rumah tetap bersih?',
    emotion: 'caring',
  },
  {
    keywords: ['pilah', 'organik', 'anorganik', 'sampah', 'daur ulang'],
    answer: 'Memilah sampah itu seperti membagi mainan ke kotak yang pas! Sampah organik seperti sisa sayur bisa jadi pupuk tanaman subur, sedangkan botol plastik bisa dilebur jadi barang baru.',
    followUp: 'Di rumahmu, apakah sudah ada tempat sampah terpisah untuk sisa makanan dan botol?',
    emotion: 'excited',
  },
  {
    keywords: ['siapa kamu', 'bumi', 'robot'],
    answer: 'Hai! Aku BUMI, robot sahabat alam dan asisten Penjaga Bumi! Aku dibuat untuk membantumu belajar menjaga keindahan planet kita dengan gembira! 🤖🌿',
    followUp: 'Apakah kamu siap untuk menyelesaikan semua misi penyelamatan bersama hari ini?',
    emotion: 'excited',
  },
];

export async function askBumi(question: string): Promise<AskBumiResponse> {
  const cleanQ = question.toLowerCase().trim();

  // Try API route first if online & configured
  try {
    const res = await fetch('/api/ai-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.answer) {
        return data;
      }
    }
  } catch {
    // Fallback to local intelligent response
  }

  // Local child-friendly rule-based knowledge engine
  for (const item of PRESET_KNOWLEDGE) {
    if (item.keywords.some(kw => cleanQ.includes(kw))) {
      return {
        answer: item.answer,
        followUpQuestion: item.followUp,
        emotion: item.emotion,
      };
    }
  }

  // Safety filter / off-topic redirect
  const unsafePatterns = ['password', 'alamat', 'telepon', 'sekolah', 'rumah', 'uang'];
  if (unsafePatterns.some(kw => cleanQ.includes(kw))) {
    return {
      answer: 'Sebagai Penjaga Bumi cilik, kita harus selalu menjaga rahasia data pribadi kita ya! Yuk kita fokus belajar hal seru tentang alam dan hewan! 🌍✨',
      followUpQuestion: 'Mau tanya tentang rahasia laut, hutan, atau cara daur ulang sampah?',
      emotion: 'caring',
    };
  }

  // Default warm and educational fallback response
  return {
    answer: `Pertanyaan yang bagus sekali, Guardian! Di alam semesta ini, semua makhluk hidup—mulai dari pohon, lebah madu, hingga ikan di laut—saling membantu untuk menjaga bumi tetap seimbang dan indah! 🌟`,
    followUpQuestion: 'Kira-kira apa bagian alam yang paling ingin kamu lindungi hari ini? Laut, hutan, atau sungai?',
    emotion: 'happy',
  };
}
