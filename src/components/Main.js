/*jshint esversion: 6 */
import React, {useState} from 'react';
import axios from 'axios';
import '../App.css';
import logo from "./logo.png";
import binance from "./binance.png";
import kucoin from "./kucoin.png";
import coinbase from "./coinbase.png";
import uniswap from "./uniswap.png";
import howto from "./howto.png";



const Main = () => {
    const [randomMade, setRandomMade] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [randomCoin, setRandomCoin] = useState({});


    const typeOfRank = {"1":<p>My mom has heard of this coin</p>,
                        "2": <p>This coin is known in the crypto community</p>,
                        "3": <p>This coin probably has a good website</p>,
                        "4": <p>This coin probably has a discord</p>,
                        "5": <p>This coin probably pays their employees in experience</p>,
                        "6": <p>This coin is trash or brand new</p>,
                        "7": <p>This coin probably has not been coded yet</p>,}



    const submitHandler = (e) => {
        e.preventDefault();

        const rand = Math.floor(Math.random() * 100);

        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=false`)
        .then((res) => {
            const random = res.data[rand];
            axios.get(`https://api.coingecko.com/api/v3/coins/${res.data[rand].id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
            .then((response) => {
            console.log(response)
            setRandomCoin({
                symbol: random.id,
                name: random.name,
                rank: random.market_cap_rank,
                image: random.image,
                link: response.data.links.homepage[0],
                source: response.data.links.repos_url.github[0],
                description: response.data.description.en
            })
            }).catch(err => console.log(err, "error in getting crypto details"));;

            setRandomMade(true);

            
        }).catch(err => console.log(err, "error in getting cryptos"));

        

    };


    return (
        <>
        <div className = 'container'>
            <img src={logo} id = 'logo' alt = "Random Coin"/>
            <div id = "go_to_helpful_links" onClick={ (e) => document.querySelector('#helpful_links').scrollIntoView({
                    behavior: "smooth",
                    block: 'center'
                })}>
                <p>Helpful Links</p>
            </div>
            <div id = "describe">
                <h1>Why did I make this app?</h1>
                <p className='text'>A hobby of mine is putting $100 into random cryptocurreny and hoping that it blows up. Sometimes I lose $100 but there are times where I make 10x my investment! However, choosing a random coin can be hard to do. That is why I made this random crypto generator. <br></br>As with most things in life, research is important. The generator picks a random crypto but also provides a link to the official website of the crypto. If there is source code available, the link to the source code is also provided.</p>
            </div>
            <div id = 'block'></div>
            {randomMade ? 
            <div id = "coin">
                <div id = 'coin_and_rank'>
                    <img id = "coin_image" src = {randomCoin.image} alt = "image"></img>
                    <p className='text'><b>Name:</b> {randomCoin.name}</p>
                    <p className='text'><b>Rank:</b> {randomCoin.rank}</p>
                </div>
                <div>
                    
                <p id ="coin_link" className='text'><b>Offical Website: </b><a href = {randomCoin.link} target='_blank' rel="noopener noreferrer">{randomCoin.link}</a></p>
                <p id ="coin_link" className='text'><b>Source Code: </b><a href = {randomCoin.source} target='_blank' rel="noopener noreferrer">{randomCoin.source}</a></p>
                <p className='text'> <b>Description:</b> </p>
                </div>
                <p className='text' id = 'description'>{randomCoin.description}</p>
                <button id = "reset" onClick = {(e) => setRandomMade(false)}>Reset</button>
            </div>
            :
            <>
            <form id = "generate" onSubmit={submitHandler}>
                <h1>Pick Coin Here</h1>
                <div id = "generate_inside">
                <label><b>Ranking Range: </b></label>
                
                <select value={pageNumber} onChange={(e) => setPageNumber(e.target.value)}>
                    <option value = "1">1 - 100</option>
                    <option value = "2">101 - 200</option>
                    <option value = "3">201 - 300</option>
                    <option value = "4">301 - 400</option>
                    <option value = "5">401 - 500</option>
                    <option value = "6">501 - 600</option>
                    <option value = "7">601 - 700</option>
                </select>
                <div id = "rank_mean">
                <p><b>Ranking Meaning: </b></p>
                {typeOfRank[pageNumber]}
                </div>
                </div>
                <input id = "generate_button" type = 'submit' value = "Generate Coin"></input>
            </form>
            </>

}
    </div>
        <div id = 'helpful_links'>
        <h1>Helpful Links / Exchange Links</h1>
        <div id = "exchange_list">
        <div className='exchanges'><a href = "https://www.binance.us" target='_blank' rel="noopener noreferrer"><img src= {binance} alt= "binance" /> <p>Binance</p></a></div>
        <div className='exchanges'><a href = "https://www.kucoin.com" target='_blank' rel="noopener noreferrer"><img src= {kucoin} alt= "kucoin" /> <p>Kucoin</p></a></div>
        <div className='exchanges'><a href = "https://www.coinbase.com" target='_blank' rel="noopener noreferrer"><img src= {coinbase} alt= "coinbase" /> <p>Coinbase</p></a></div>
        <div className='exchanges'><a href = "https://app.uniswap.org/#/swap" target='_blank' rel="noopener noreferrer"><img src= {uniswap} alt= "uniswap" /> <p>UniSwap</p></a></div>
        <div className='exchanges'><a href = "https://www.investopedia.com/investing-in-cryptocurrency-5215269" target='_blank' rel="noopener noreferrer"><img src= {howto} alt= "How to Crypto" /> <p>Crypto 101</p></a></div>
        </div>
        </div>
    </>
    )
}

export default Main