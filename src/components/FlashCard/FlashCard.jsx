import React, { useState, useRef, useEffect } from "react";
import "./Flashcard.css";
import { gsap } from "gsap";

const Flashcard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                rotateY: flipped ? 180 : 0,
                x: flipped ? 35 : 0,
                duration: 0.4,
                ease: "power2.inOut",
            });
        }
    }, [flipped]);

    const handleClick = () => {
        setFlipped((prev) => !prev);
    };

    return (
        <div className="card-container" onClick={handleClick}>
            <div className="card" ref={cardRef}>
                <div className="side front">{question}</div>
                <div className="side back">{answer}</div>
            </div>
        </div>
    );
};

export default Flashcard;
