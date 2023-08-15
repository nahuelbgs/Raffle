import { React, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import RaffleResults from "../RaffleResults/RaffleResults";
import Swal from 'sweetalert2'
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "../../App.css";
import "./Raffle.css";

function Raffle() {
  const [length, setLength] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [participantsList, setParticipantsList] = useState([]);
  const [raffleResults, setRaffleResults] = useState([]);
  const [id, setId] = useState(0);
  const participantObject = {
    name: inputValue,
    id: id,
    entries: 1,
  };
  const handleValue = (e) => {
    setInputValue(e.target.value);
  };
  function isDuplicated(arr, name) {
    return arr.some((arr) => arr.name.toLowerCase() === name.toLowerCase());
  }
  const handleParticipants = (e) => {
    if (e.key === "Enter" && isDuplicated(participantsList, inputValue)) {
      e.preventDefault()
      Swal.fire({
          title: 'Error!',
          text: 'Ese participante ya está en la lista',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
    } else if (e.key === "Enter" && inputValue.replace(/\s/g, "") === "") {
      e.preventDefault()
      Swal.fire({
        title: 'Error!',
        text: 'No puedes listar un participante vacío',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    } else if (e.key === "Enter") {
      setParticipantsList([...participantsList, participantObject]);
      setId(id + 1);
      setInputValue("");
    }
  };
  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const handleRaffle = (e) => {
    if (length <= 0) {
      e.preventDefault()
      Swal.fire({
        title: 'Error!',
        text: 'El número de premios debe ser mínimo 1',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      setLength(1);
    } else if (length > participantsList.length) {
      e.preventDefault()
      Swal.fire({
        title: 'Error!',
        text: 'El número de premios no puede ser mayor al de participantes',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    } else {
      let arr = participantsList;
      let doubleOpportunity = participantsList.filter(
        (participant) => participant.entries === 2
      );
      for (let i = 0; i < doubleOpportunity.length; i++) {
        arr.push(doubleOpportunity[i]);
      }
      arr.sort(() => Math.random() - 0.5);
      const winners = arr.slice(0, length);
      const uniqueWinners = winners.filter(
        (winner, index, self) =>
          self.findIndex((w) => w.id === winner.id) === index
      );
      if (uniqueWinners.length < length) {
        const remainingWinnersNeeded = length - uniqueWinners.length;
        for (let i = 0; i < remainingWinnersNeeded; i++) {
          const randomWinner = arr.find(
            (participant) =>
              !uniqueWinners.some((winner) => winner.id === participant.id)
          );
          if (randomWinner) {
            uniqueWinners.push(randomWinner);
          }
        }
      }
      return setRaffleResults(uniqueWinners);
    }
  };
  const handleDelete = (a) => {
    return setParticipantsList(participantsList.filter((el) => el != a));
  };
  const handleDeleteAll = () => {
    setParticipantsList([]);
  };
  const again = () => {
    setRaffleResults([]);
    setParticipantsList([]);
    setInputValue("");
    setLength("");
  };
  const handleDoubleOpportunity = (p) => {
    if (p.entries === 1) {
      p.entries = 2;
    } else {
      p.entries = 1;
    }
    setInputValue(" ");
    setTimeout(() => {
      setInputValue("");
    }, 0);
  };
  return (
    <>
      {raffleResults.length > 0 ? (
        <RaffleResults raffleResults={raffleResults} again={again} />
      ) : (
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
            <div className="input-container">
              <input
                className="input"
                placeholder="Ingrese Participantes"
                value={inputValue}
                onChange={handleValue}
                onKeyDown={handleParticipants}
              />
            </div>
            <div className="participants-container">
              {participantsList.map((participant) => (
                <div className="participant" key={participant.id}>
                  <Menu
                    menuButton={
                      <MenuButton
                        className={
                          participant.entries === 2
                            ? "singleParticipant doubleOpportunity"
                            : "singleParticipant"
                        }
                      >
                        {participant.name}
                      </MenuButton>
                    }
                    transition
                  >
                    <MenuItem
                      onClick={() => handleDoubleOpportunity(participant)}
                    >
                      {participant.entries == 1
                        ? "Doble oportunidad"
                        : "Quitar doble oportunidad"}
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(participant)}>
                      Borrar
                    </MenuItem>
                  </Menu>
                </div>
              ))}
            </div>
            <div className="input-container">
              <input
                className="input"
                placeholder="Número de premios"
                type="number"
                value={length}
                onChange={handleLength}
              />
            </div>
            <div className="buttons-container">
              <button className="sortear" onClick={handleRaffle}>
                Sortear
              </button>
              <button className="borrar-nombres" onClick={handleDeleteAll}>
                LIMPIAR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Raffle;
