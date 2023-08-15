import {React} from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from "@uidotdev/usehooks";
import "./RaffleResults.css";

export default function RaffleResults({ raffleResults, again }) {
  const size = useWindowSize()
  return (
    <>
    {<Confetti numberOfPieces={200} recycle={false} width={size.width} height={size.height} />}
      <div className="main-container">
        <div className="left-container">
          <div className="header">
            <div className="raffle-img-container">
              <img
                className="raffle-img"
                src="https://i.ibb.co/xC0D6VD/raffle-icon.png"
                alt="Raffle logo"
              />
            </div>
            <h1 className="raffle-title">Raffle</h1>
          </div>
        </div>
        <div className="right-container">
          <h1 className="winners-h1">Los ganadores son:</h1>
          <div className="winners-container">
          {raffleResults.map((result) => (
            <div key={result.id}>
              <p>{result.name}</p>
            </div>
          ))}
          </div>
          <button className="sortear" onClick={again}>
            Realizar otro sorteo
          </button>
        </div>
      </div>
    </>
  );
}
