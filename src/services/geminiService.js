const GEMINI_API_KEY = "AIzaSyDcuTPhY5jlmc-8fCa3maD5GUVcdbmVFps";
const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateFlashcards(topic) {
    const prompt = `Сгенерируй 6 и только 6 flash-карточек на тему "${topic}" в формате:
Вопрос - Ответ, Без другого текста кроме вопросов и ответов, без выделения жирным, курсива и тд
Пример:
Что такое гравитация? - Это сила, притягивающая тела друг к другу.`;

    const body = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error ${response.status}: ${response.statusText}`
            );
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        const lines = text.split("\n").filter((l) => l.trim());
        const flashcards = [];

        for (let line of lines) {
            const [q, ...aParts] = line.split(/[:\-–]/);
            const a = aParts.join(" - ").trim();
            if (q && a) flashcards.push({ question: q.trim(), answer: a });
        }

        return flashcards.length > 0
            ? flashcards
            : [
                  {
                      question: "Ошибка",
                      answer: "Невозможно распарсить ответ модели.",
                  },
              ];
    } catch (error) {
        console.error("Gemini API error:", error);
        return [{ question: "Ошибка", answer: "Не удалось загрузить данные." }];
    }
}
