import React, { FC } from 'react'
import styles from '../styles/HeaderTable.module.css'

interface IHeaderTableProps {
  value: string
}

export const HeaderTable: FC<IHeaderTableProps> = ({value}) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>Название</div>
      <div className={styles.description}>{value}</div>
    </div>
  )
}
