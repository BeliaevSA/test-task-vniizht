import React from 'react'
import styles from '../styles/Trains.module.css'
import { useAppSelector } from '../hooks'
import { TrainItem } from './TrainItem'
import { ITrain } from '../store/trainSlice'
import { HeaderTable } from './HeaderTable'

export const Trains = () => {
  const { dataTrains } = useAppSelector(state => state.trains)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Поезда</h2>
      <HeaderTable value='Описание'/>
      <div className={styles['list-train']}>{
        dataTrains.map((train: ITrain) => (
          <TrainItem 
            key={train.id} 
            train={train}
          />
        ))}
      </div>
    </div>
  )
}
