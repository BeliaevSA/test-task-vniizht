import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/App.module.css'
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchDataTrains } from '../store/trainSlice';
import { BeatLoader } from 'react-spinners';
import { Trains } from './Trains';
import { EditTrain } from './EditTrain';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { idEditTrain} = useAppSelector(state => state.trains)
  const dispatch = useAppDispatch()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try{
      const data = await dispatch(fetchDataTrains())
      if(data.type === 'user/fetchToken/rejected') {
        throw new Error(`${data.payload}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    isLoading ? 
      <div className={styles.loader}>
          <BeatLoader color="#36d7b7" />
      </div> 
        :
      <div className={styles.container}>
        <Trains />
        {idEditTrain && <EditTrain />}
      </div>
  );
}