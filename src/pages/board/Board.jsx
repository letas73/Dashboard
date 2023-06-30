import React, { useState } from 'react'
import BoardK, { moveCard, moveColumn, removeCard, addCard } from '@asseinfo/react-kanban'
import "@asseinfo/react-kanban/dist/styles.css"
import useBoard from '../../store/board'
import { RxCross2 } from 'react-icons/rx'
import { IoMdAdd } from 'react-icons/io'
import './Board.css'
import AddCardModal from '../../components/add-card-modal/AddCardModal'

const Board = () => {
  const { board, setBoard } = useBoard()
  const [modalOpened, setModalOpened] = useState(false)

  const handleColumnMove = (_card, source, destination) => {
    const updatedBoard = moveColumn(board, source, destination)
    setBoard(updatedBoard)
  }

  const handleCardMove = (_card, source, destination) => {
    const updatedBoard = moveCard(board, source, destination)
    setBoard(updatedBoard)
  }

  const getColumn = (card) => {
    const column = board.columns.filter((column) => column.cards.includes(card))
    return column[0]
  }

  const getGradient = (card) => {
    const column = getColumn(card)
    const title = column.title

    if (title === "TODO") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 189, 220) 163.54%)",
      };
    } else if (title === "Doing") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(220, 48, 48) 163.54%)",
      };
    } else if (title === "Completed") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 220, 86) 163.54%)",
      };
    } else if (title === "Backlog") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65,65, 0.67) -1.72%,rgba(134, 48, 220) 163.54%)",
      };
    }
  }

  return (
    <div className='board-container'>
      <span>Trello Board</span>

      <BoardK
        allowAddColumn
        allowRenameColumn
        allowRemoveCard
        onCardDragEnd={handleCardMove}
        onColumnDragEnd={handleColumnMove}
        renderCard={(props) => (
          <div className='kanban-card' style={getGradient(props)}>
            <div>
              <span>{props.title}</span>
              <button
                onClick={() => {
                  const updatedBoard = removeCard(board, getColumn(props), props)
                  setBoard(updatedBoard)
                }}
                className='remove-button'
                type='button'
              >
                <RxCross2 color='white' size={15} />
              </button>
            </div>
            <span>{props.description}</span>
          </div>
        )}
        renderColumnHeader={(props) => {
          const handleAddCard = (title, details) => {
            const card = {
              id: new Date().getTime(),
              title,
              description: details
            }

            const updatedBoard = addCard(board, props, card)
            setBoard(updatedBoard)
            setModalOpened(false)
          }

          return (
            <div className='column-header'>
              <span>{props.title}</span>
              <IoMdAdd
                color='white'
                size={25}
                title='Add card' 
                onClick={() => setModalOpened(true)}
              />
              <AddCardModal
                visible={modalOpened}
                onClose={() => setModalOpened(false)}
                handleAddCard={handleAddCard}
              />
            </div>
          )
        }}
      >
        {board}
      </BoardK>
    </div>
  )
}

export default Board