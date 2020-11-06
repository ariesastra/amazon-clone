import React from 'react'

// component
import Product from '../homepage/Products'

// Material UI

// Style
import '../../scss/home.scss'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                {/* Banner */}
                <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/PrimeDay/Fuji_TallHero_NonPrime_v2_en_US_1x._CB403670067_.jpg" alt="Banner 1" className="home__image"/>
                {/* Row Product */}
                <div className="home__row">
                    {/* product */}
                    <Product 
                            id={1}
                            title='The Lean Start Up' 
                            image='https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UY218_.jpg' 
                            rating={5}
                            price='100'
                    />
                    <Product 
                            id={2}
                            title='New Apple iPhone 12 Pro Max (128GB, Graphite) [Locked] + Carrier Subscription' 
                            image='https://m.media-amazon.com/images/I/71MHTD3uL4L.jpg' 
                            rating={5}
                            price='1999'
                    />
                </div>
                <div className="home__row">
                    <Product 
                            id={3}
                            title='Animal Crossing: New Horizons - Nintendo Switch' 
                            image='https://images-na.ssl-images-amazon.com/images/I/710JXdscVsL._SY445_.jpg' 
                            rating={4}
                            price='499'
                    />
                    <Product 
                            id={4}
                            title='LG 34BK95U-W UltraFine 34" 21:9 5K 2K (5120 x 2160) Nano IPS LED UltraWide Monitor, 600 cd/m² HDR, Thunderbolt 3 / USB Type-C Inputs' 
                            image='https://images-na.ssl-images-amazon.com/images/I/617rZtdWxuL._AC_SX522_.jpg' 
                            rating={5}
                            price='1500'
                    />
                    <Product 
                            id={5}
                            title='BalanceFrom Puzzle Exercise Mat with EVA Foam Interlocking Tiles for MMA, Exercise, Gymnastics and Home Gym Protective Flooring' 
                            image='https://images-na.ssl-images-amazon.com/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x._SY304_CB434924743_.jpg' 
                            rating={2}
                            price='1000'
                    />
                </div>
                <div className="home__row">
                    <Product 
                            id={6}
                            title='Tesla, Elon Musk and the EV Revolution: An in-depth analysis of what’s in store for the company, the man, and the industry by a value investor and newly-minted Tesla owner Kindle Edition' 
                            image='https://m.media-amazon.com/images/I/41B2nj3ubZL.jpg' 
                            rating={5}
                            price='30000'
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
