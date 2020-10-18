import Head from 'next/head'
import { useState } from 'react'
import Details from '../components/Details'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import api from '../api/api'
import styles from '../styles/Home.module.css'

function Home({ data }) {
  let [responseData, setResponseData] = useState('')
  let [success, setSuccess] = useState('')
  let [land, setLand] = useState('')
  let [message, setMessage] = useState('')
  let [initailRender, setInitialRender] = useState('true')

  const updatePage = (e, value) => {
    e.preventDefault()

    setMessage('Loading...')

    const query = {
      limit: 100,
      launch_year: value,
      launch_success: success,
      land_success: land,
    }
    api.getData(query)
    .then((response) => {
      if (response && response.data && response.data.length > 0) {
        setMessage('')
        setResponseData(response.data)
        console.log("Response: " + responseData)
      } else {
        setResponseData('')
        setMessage('No Data Available...')
      }
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }

  const onClick = (e, value) => {
    setInitialRender(false)
    updatePage(e, value)
  }
  
  const years = []
  const cards = []
  for (let i = 2006; i <= 2020; i++) {
    years.push(<Button className={styles.filterBtn}
      variant={"success"} 
      value={i} 
      onClick={(e) => onClick(e, e.target.value)}>{i}</Button>)
  }
  if (initailRender) {
    console.log("init render ", initailRender)
    for (let i = 0; i < data.length; i++) {
      cards.push(<Details className={styles.card} data={data[i]}></Details>)
    }
  } else {
    for (let i = 0; i < responseData.length; i++) {
      cards.push(<Details className={styles.card} data={responseData[i]}></Details>)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          SpaceX Launch Programs
        </h1>
        <div className={styles.loading}>{message}</div>
      
        <div className={styles.sections}>
          <Card className={styles.filter}>
            <Card.Body>
              <Card.Title>Filters</Card.Title>
              <p className={styles.filterTitle}>Launch Year</p>
              <div>
                {years}
              </div>
              <p className={styles.filterTitle}>Successful Launch</p>
              <div>
                <Button variant="success" value={true} className={styles.filterBtn}
                  onClick={(e) => setSuccess(e.target.value)}>True</Button>
                <Button variant="success" value={false} className={styles.filterBtn}
                  onClick={(e) => setSuccess(e.target.value)}>False</Button>
              </div>
              <p className={styles.filterTitle}>Successful Landing</p>
              <div>
                <Button variant="success" value={true} className={styles.filterBtn}
                  onClick={(e) => setLand(e.target.value)}>True</Button>
                <Button variant="success" value={false} className={styles.filterBtn}
                  onClick={(e) => setLand(e.target.value)}>False</Button>
              </div>
            </Card.Body>
          </Card>
          <div className={styles.grid}>
              {cards}
          </div>
        </div>
        
      </main>

      <footer className={styles.footer}>
        <h3>Developed by: </h3>
        <p>Pooja Ashoka</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://api.spaceXdata.com/v3/launches?limit=100`)
  const data = await res.json() 
  return {props: { data }}
}

export default Home