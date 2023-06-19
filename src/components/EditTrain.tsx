import { useEffect, useState } from 'react'
import styles from '../styles/EditTrain.module.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import { ITrain, setIdEditTrain, setSpeedArr } from '../store/trainSlice'
import { HeaderTable } from './HeaderTable'
import { SpeedItem } from './SpeedItem'
import { AiOutlineCloseCircle } from "react-icons/ai";

export const EditTrain = () => {
  const dispatch = useAppDispatch()

  const [train, setTrain] = useState<ITrain | null>(null)
  const {dataTrains, idEditTrain, speedArr} = useAppSelector(state => state.trains)

  useEffect(() => {
    const train = dataTrains.find(train => train.id === idEditTrain)

    if(!train) return

    setTrain(train)

    const speed = [...train.speed]
    const sortSpeed = speed.sort((a, b) => a - b)
    dispatch(setSpeedArr(sortSpeed))
  }, [dataTrains, dispatch, idEditTrain])

  const handlerClickSendData = () => {
    try {
      const changeSpeedArr = [...speedArr]
      console.log(changeSpeedArr.sort((a, b) => a - b))
      console.log('Данные успешно отправлены...')
    } catch (e) {
      console.error(e)
    }
    

  }

  return (
    <div className={styles.container}>
      <div 
        className={styles.close} 
        onClick={() => dispatch(setIdEditTrain(null))}
      >
        <AiOutlineCloseCircle size={28} />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>Ограничения по скорости</h2>
        <h3 className={styles.subtitle}>Поезд №{train?.numberTrain}</h3>
        <HeaderTable value='Ограничение скорости'/>
        {speedArr.map((value, index) => (
          <SpeedItem key={index} index={index} speed={value}/>
        ))}
      </div>
      <div className={styles['button-wrapper']}>
        <button 
          className={styles.button} 
          onClick={handlerClickSendData}
        >
          Отправить данные
        </button>
      </div>
      
    </div>
  )
}
