import { useState } from 'react'
import './App.css'
import sun from './assets/quyosh.png'
import bomdod from './assets/bomdod.png'
import hufton from './assets/hufton.png'
import peshin from './assets/peshin.png'
import asr from './assets/asr.png'
import shom from './assets/shom.png'
import error from './assets/error.png'
import axios from 'axios'
const Api_link = 'https://islomapi.uz/api/present/day?region'

function App() {
  const date = new Date()
  const Data = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  const Month = (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth())
  const Year = date.getFullYear()
  const [city, setCity] = useState('')
  const [api, setApi] = useState(true)
  const [time, setTime] = useState({
    region: "",
    data: Data + ":" + Month + ":" + Year,
    bomdod: "",
    quyosh: "",
    peshin: "",
    asr: "",
    shom: "",
    hufton: "",
    error: null
  })
  const fetchApi = () => {
    axios.get(`${Api_link}=${city.toLocaleUpperCase()}`)
      .then((data) => {
        setTime({
          region: data.data.region,
          bomdod: data.data.times.tong_saharlik,
          quyosh: data.data.times.quyosh,
          peshin: data.data.times.peshin,
          asr: data.data.times.asr,
          shom: data.data.times.shom_iftor,
          hufton: data.data.times.hufton,
          data: Data + ":" + Month + ":" + Year,
        })
        setApi(true)
      })
      .catch((error) => {
        setApi(false)
        console.log(error);
        setTime({
          region: "",
          bomdod: "",
          quyosh: "",
          peshin: "",
          asr: "",
          shom: "",
          hufton: "",
          error: "Shahar topilmadi"
        })
      })

  }
  return (
    <div className="common">
      <div className='top'>
        <div className='inputs'>
          <input type="text" className='text' placeholder='Region' onChange={(e) => setCity(e.target.value)} />
          <input type="submit" value="Submit" className='sub' onClick={fetchApi} />
        </div>
      </div>
      <div className='info'>
        <h1>{time.data}</h1>
        <h1>{time.region}</h1>
      </div>
      {api ?
        <>
          <div className='bottom'>
            <div className='sun'>
              <img src={bomdod} />
              <h3>Bomdod: {time.bomdod}</h3>
            </div>
            <div className='sun'>
              <img src={sun} />
              <h3>Quyosh: {time.quyosh}</h3>
            </div>
            <div className='sun'>
              <img src={peshin} />
              <h3>Peshin: {time.peshin}</h3>
            </div>
            <div className='sun'>
              <img src={asr} />
              <h3>Asr: {time.asr}</h3>
            </div>
            <div className='sun'>
              <img src={shom} />
              <h3>Shom: {time.shom}</h3>
            </div>
            <div className='sun'>
              <img src={hufton} />
              <h3>Hufton: {time.hufton}</h3>
            </div>
          </div>
        </>
        :
        <>
          <div className='errorPage'>
            <div className='error'>
              <img src={error} />
              <h3>{time.error}</h3>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
