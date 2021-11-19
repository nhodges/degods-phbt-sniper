import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home = ({ phbtDeGods }: any) => {
  console.log(phbtDeGods)

  

  return (
    <div className={styles.container}>
      <Head>
        <title>DeGods - PHBT Sniper</title>
        <meta name="description" content="DeGods - PHBT Sniper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          DeGods Paper Handed Bitch Tax Sniper
        </h1>

        <p className={styles.description}>
          All tips will go to burning paper handed bitches{' '}
          <code className={styles.code}>2i3b3R5LTmqEG7rxGmywLXkDjSjkCi9veCme2xj97kao</code>
        </p>

        <div className={styles.grid}>

          {phbtDeGods && phbtDeGods.map((phbtDeGod: any) => {
            return (

              <a key={phbtDeGod.mintId} href={`https://alpha.art/t/${phbtDeGod.mintId}`} className={styles.card}>
                <h2>{phbtDeGod.title}</h2>
                <img src={phbtDeGod.image} />
              </a>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by DeGods
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context: any) {
  console.log(context)
  let phbtDeGods: any = []
  const firstPageResponse = await fetch('https://apis.alpha.art/api/v1/collection', {
    method: 'POST',
    headers: {},
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify({
      collectionId: "degods",
      orderBy: "PRICE_LOW_TO_HIGH",
      status: ["BUY_NOW"]
    })
  })
  const firstPageResponseParsed = await firstPageResponse.json()
  phbtDeGods = phbtDeGods.concat(firstPageResponseParsed.tokens.filter((token: any) => {
    return parseInt(token.last, 10) > parseInt(token.price, 10)
  }))
  if (firstPageResponseParsed.nextPage !== '') {
    let getPages = true
    let nextPageToken = firstPageResponseParsed.nextPage
    while(getPages === true) {
      let nextPageResponse = await fetch('https://apis.alpha.art/api/v1/collection', {
        method: 'POST',
        headers: {},
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          token: nextPageToken
        })
      })
      let nextPageResponseParsed = await nextPageResponse.json()
      phbtDeGods = phbtDeGods.concat(nextPageResponseParsed.tokens.filter((token: any) => {
        return parseInt(token.last, 10) > parseInt(token.price, 10)
      }))
      if (!nextPageResponseParsed.nextPage) {
        getPages = false
      } else {
        nextPageToken = nextPageResponseParsed.nextPage
      }
    }
  }
  return {
    props: { phbtDeGods }, // will be passed to the page component as props
  }
}

export default Home
