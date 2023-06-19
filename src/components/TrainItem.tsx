import React, { FC } from 'react'
import styles from '../styles/TrainItem.module.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import { ITrain, setIdEditTrain } from '../store/trainSlice'

interface ITrainItemProps {
  train: ITrain
}

export const TrainItem: FC<ITrainItemProps> = ({train}) => {
  const {idEditTrain} = useAppSelector(state => state.trains)
  const dispatch = useAppDispatch()
  
  const handlerClick = () => {
    dispatch(setIdEditTrain(train.id))
  }

  const style = ( idEditTrain === train.id ) ? 
    `${styles.container} ${styles.active}` : 
    `${styles.container}`

  // const style = (index === speedArr.length - 1) ?
  // `${styles.container} ${styles.last}` :
  // `${styles.container}`

  return (
    <div className={style} onClick={handlerClick} >
      <div className={styles.name}>{`Поезд №${train.numberTrain}`}</div>
      <div className={styles.description}>{train.description}</div>
    </div>
  )
}
