import { useState } from 'react';
import { Questions } from './data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [selected, setSelected] = useState("");

    const NextButton = () => {
        if (lock) {
            if (index < Questions.length - 1) {
                setIndex(prev => prev + 1);
                setSelected("");
                setLock(false);
            } else {
                setResult(true);
            }
        } else {
            alert("Please select one answer!");
        }
    };

    const AnswerClick = (optionKey) => {
        if (!lock) {
            setSelected(optionKey);
            if (optionKey === Questions[index].answ) {
                setScore(prev => prev + 1);
            }
            setLock(true);
        }
    };

    const Reset = () => {
        setIndex(0);
        setLock(false);
        setScore(0);
        setResult(false);
        setSelected("");
    };

    return (
        <div className="bg-gray-200 rounded-xl w-2xl p-5 font-poppins">
            <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-700 text-center">Quiz App</h1>
            <hr className="border-1 text-gray-500" />

            {result ? (
                <div>
                    <h1 className="mt-4 font-semibold">Your Score is: {score * 20}/100</h1>
                    <button
                        onClick={Reset}
                        className="block mx-auto py-3 px-14 bg-blue-500 text-gray-200 border-0 rounded text-lg cursor-pointer hover:bg-blue-600 duration-200 transition-all"
                    >
                        Reset
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="my-3 text-lg text-gray-600 font-semibold">
                        {index + 1}. {Questions[index].question}?
                    </h3>
                    <ul>
                        {["option1", "option2", "option3", "option4"].map((optionKey) => {
                            const optionValue = Questions[index][optionKey];
                            const isSelected = selected === optionKey;
                            const isCorrect = Questions[index].answ === optionKey;

                            let bgClass = "";
                            if (lock && isSelected && isCorrect) {
                                bgClass = "bg-[#aaf1aa] border-[#2eca2e]"; // correct answer selected
                            } else if (lock && isSelected && !isCorrect) {
                                bgClass = "bg-[#e6caca] border-[#9c6c6c]"; // wrong answer selected
                            }

                            return (
                                <li
                                    key={optionKey}
                                    className={`py-3 px-2 border border-gray-400 rounded text-gray-800 hover:bg-gray-300 transition-all duration-300 cursor-pointer mb-2 ${bgClass}`}
                                    onClick={() => AnswerClick(optionKey)}
                                    style={{ pointerEvents: lock ? "none" : "auto" }}
                                >
                                    {optionValue}
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        className="block mx-auto mt-8 py-3 px-16 border-0 rounded bg-purple-500 text-gray-300 font-semibold hover:bg-purple-600 cursor-pointer transition-all duration-200"
                        onClick={NextButton}
                    >
                        Next
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-3">
                        {index + 1} of {Questions.length} questions
                    </p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
