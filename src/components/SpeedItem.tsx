import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/SpeedItem.module.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import {  setSpeedArr } from '../store/trainSlice'

interface ISpeedItem {
  index: number
  speed: number
}

export const SpeedItem: FC<ISpeedItem> = ({index, speed}) => {
  const {speedArr} = useAppSelector(state => state.trains)
  const [value, setValue] = useState(speed)
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    setValue(speed)
  }, [speed])
  
  const style = (index === speedArr.length - 1) ?
    `${styles.container} ${styles.last}` :
    `${styles.container}`

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(isNaN(+e.target.value)) return

    console.log(typeof +e.target.value)
    let newSpeedArr = [...speedArr]
    newSpeedArr[index] = +e.target.value

    setValue(+e.target.value)
    dispatch(setSpeedArr(newSpeedArr))
    
  }

  return (
    <div className={style} >
      <div className={styles.name}>
        {`Скорость ${index + 1}`}
      </div>
      <div className={styles['input-wrapper']}>
        <input 
          className={styles.input} 
          value={value} 
          onChange={handlerChange}
        />
      </div>
    </div>
  )
}
