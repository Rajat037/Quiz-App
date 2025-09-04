import React, { useState } from 'react';
import './Quiz.css';
import data from '../../assets/data.json';

const Quiz = () => {

    const [index,setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    //const[lock,setLock] = useState(false);
    const[finished,setFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState(Array(data.length).fill(null));


    const question = data[index]; 

    const checkAns = (option) => {
        //if(lock) return;
        const newAnswers = [...userAnswers];
        newAnswers[index] = option;
        setUserAnswers(newAnswers);
        setSelected(option);
        //setLock(true);
        if(option === question.answer) {
            setScore(score + 1);
        }
    };


    const handleNext = () => {
        if(index+1<data.length) {
            setIndex(index + 1);
            setSelected(null);
           // setLock(false);
        }
        else{
            setFinished(true);
        }

    };
        const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
            setSelected(userAnswers[index-1]); 
            //setLock(userAnswers[index - 1]!==null);     
        }
    };

     const handleReset = () => {
        setIndex(0);
        setSelected(null);
        setScore(0);
        //setLock(false);
        setFinished(false);
    };

    if (finished) {

        const percentage = (score / data.length)*360;
        return (
            <div className="container">
                <h1>Quiz Finished!</h1>
                            <div
                className={`result-circle ${score > 7 ? 'success' : 'fail'}`}
                style={{
                    background: `conic-gradient(#4caf50 0deg ${percentage}deg, #ddd ${percentage}deg 360deg)`
                }}
            >
                <span>{score} / {data.length}</span>
            </div>
                <h2>
                    {score > 7
                     ? "Congratulations! Great job, you did it!"
                      : "Better luck next Time!"}
                </h2>
              <button onClick={handleReset} >Restart Quiz</button>

            </div>
        );
    }


    return (
        <div className='container'>
            <h1>Quize App</h1>
            <hr/>
            <h2>{index+1}. {question.question}</h2>
       <ul>
            {question.options.map((option, i) => (
                <li
                key={i}
                onClick={() => checkAns(option)}
                className={selected === option ? 'selected-click' : ''}
                >
                {option}
                </li>
            ))}
        </ul>


    <div className="buttons">
        <button 
            onClick={handlePrev} 
            disabled={index === 0}  // disable on first question
        >
            Previous
        </button>

        <button 
            onClick={handleNext} 
            disabled={!selected}    // disable until selection
        >
            Next
        </button>
    </div>

    <div className='index'>{index + 1} of {data.length} questions</div>


                

            </div>
        );
    }

export default Quiz;