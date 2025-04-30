import React, { useState, useEffect } from "react";
import Flashcard from "./components/FlashCard/FlashCard.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";
import { generateFlashcards } from "./services/geminiService";
import "./styles/App.css";

function App() {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState("light");
    const [topic, setTopic] = useState("физика");

    const themes = ["физика", "математика", "география"];

    useEffect(() => {
        loadCards(topic);
    }, [topic]);

    const loadCards = async (subject) => {
        setLoading(true);
        const data = await generateFlashcards(subject);
        setFlashcards(data);
        setLoading(false);
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        document.body.className = theme === "light" ? "dark" : "light";
    };

    return (
        <div className="App">
            <header>
                <h1>Интерактивные карточки</h1>
                <button onClick={toggleTheme}>Сменить тему</button>
            </header>

            <div className="menu">
                {themes.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTopic(t)}
                        className={topic === t ? "active" : ""}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <p className="counter">Всего карточек: {flashcards.length}</p>

            {loading ? (
                <Spinner />
            ) : (
                <div className="cards-container">
                    {flashcards.map((card, i) => (
                        <Flashcard
                            key={i}
                            question={card.question}
                            answer={card.answer}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
