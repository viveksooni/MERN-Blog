import CrossAndZero from "@/components/Custom/CrossAndZero";
import { SquareEqual } from "lucide-react";
import React, { useEffect, useState } from "react";

function SquaresComponent({ index, isClicked, onClickHandler }) {
  return (
    <div
      onClick={() => onClickHandler(index)}
      className={`aspect-square w-full border-4 rounded-lg ${
        !isClicked
          ? "border-blue-700  hover:bg-blue-500"
          : "border-red-700  hover:bg-red-500"
      }  transition-colors`}
    ></div>
  );
}

export default function Project() {
  const [clickOrder, setClickOrder] = useState([]);
  const [squares, setSquares] = useState(Array(9).fill(false));
  const [isReversing, setIsReversing] = useState(false);
  const [reverseIndex, setReverseIndex] = useState(8);
  useEffect(() => {
    if (isReversing && reverseIndex >= 0) {
      const timer = setTimeout(() => {
        setSquares((prev) => {
          let newSquare = [...prev];
          newSquare[clickOrder[reverseIndex]] = false;
          return newSquare;
        });
        setReverseIndex((prev) => prev - 1);
      }, 500);
    } else if (reverseIndex < 0) {
      setIsReversing(false);
      setClickOrder([]);
      setReverseIndex(8);
    }
  }, [isReversing, reverseIndex, clickOrder]);
  const onClickHandler = (index) => {
    console.log(index);
    if (clickOrder.includes(index)) return;
    let newArr = [...squares];
    // console.log(squares);
    newArr[index] = true;
    setSquares(newArr);
    console.log(clickOrder);
    setClickOrder((prev) => [...prev, index]);

    if (clickOrder.length == 8) {
      setIsReversing(true);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen p-4">

        <div className="text-3xl"> Reverse Square Game</div> 
        <div className="grid grid-cols-3 gap-4 w-[300px] aspect-square">
          {squares.map((isClicked, index) => {
            return (
              <SquaresComponent
                key={index}
                isClicked={isClicked}
                onClickHandler={onClickHandler}
                index={index}
              ></SquaresComponent>
            );
          })}
        </div>
        <div className="text-2xl font-gray-200">
          {isReversing
            ? "Reversing..."
            : `Squares left : ${9 - clickOrder.length}/9`}
        </div>
      </div>
      <CrossAndZero></CrossAndZero>
    </div>
  );
}
