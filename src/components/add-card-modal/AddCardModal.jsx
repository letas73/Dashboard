import React, { useState } from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import css from './AddCardModal.module.css'

const AddCardModal = ({ visible, onClose, handleAddCard }) => {
  const customStyles = {
    background: 'rgb(58, 58, 58)',
    padding: '20px',
    width: '50%',
    top: '-3rem',
    height: 'fit-content',
    maxWidth: '40rem'
  }

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeDetails = (e) => {
    setDetails(e.target.value)
  }

  return (
    <Rodal customStyles={customStyles} visible={visible} onClose={onClose}>
      <div className={css.container}>
        <div>
          <span className={css.label}>
            Card Title
          </span>
          <input type="text" className={css.input} value={title} onChange={onChangeTitle} />
        </div>
        <div>
          <span className={css.label}>
            Detail
          </span>
          <textArea
            rows={10}
            className={css.input}
            value={details}
            type='text'
            onChange={onChangeDetails}
          />
        </div>
        <button
          disabled={title === '' && details === ''}
          className={css.saveButton}
          onClick={() => {
            handleAddCard(title, details)
            setDetails('')
            setTitle('')
          }}
        >
          Add
        </button>
      </div>
    </Rodal>
  )
}

export default AddCardModal