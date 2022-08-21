import React, {useState, useEffect} from 'react'
import classNames from 'classnames'
import './Slider.css'
import sliderAc from '../assets/ccBc.svg' ;
import logoac from '../assets/ccAc.svg' ;

const slideData = [
  {
    _id: 10,
    name: "zero",
    description: "new kids on the block"
  },
  {
    _id: 11,
    name: "eugene",
    description: "girls wanna have fun"
  },
  {
    _id: 12,
    name: "Honda",
    description: "car"
  },
  {
    _id: 13,
    name: "Honda",
    description: "car"
  },
  {
    _id: 14,
    name: "Honda",
    description: "car"
  },
  {
    _id: 15,
    name: "Honda",
    description: "car"
  }


];

function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 
 
  useEffect(
    () => {
      if (!url) {
        return
      }
      fetch(url)
        .then(data => data.json())
        .then(data => {
          setData(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.toString())
          setLoading(false)
        })
    },
    [url],
    console.log('d', data)
  )

  return [loading, data]
}

function CardItem({artist, flavor, character, num, username, indexAc, mana}) {
  var liClassesMPV = classNames({
    'slide': true,
    'activeClass': username === indexAc,   
  });
  return (
    <>
    <div className={liClassesMPV}>
      <img src={character} width={400} height={400}/>
       <div className='info'>  
          <h2>{artist}</h2>
          <p>{flavor}</p>
          <span>{mana}</span>
        </div>
    </div>
    <div className='slideOne'>
       <img src={character} width={400} height={400}/>
      <div className='info'>  
         <h2>{artist}</h2>
         <p>{flavor}</p>
         <span>{mana}</span>
         </div>
    </div>
  </> 
  )
} 

function Slider() {
  const [username, setUsername] = React.useState(10)
  const [indexAc, setindexActive] = React.useState(0)
  const [autoplaySpeedActive, setAutoplaySpeedActive] = React.useState(false)

  if(username === 20){
    setUsername(10);
  }
  const [postLoading,  postData] = useFetch(
    `https://api.scryfall.com/cards/xln/${username}`,
  )
  const [ userData] = useFetch(
    postData
      ? `https://api.scryfall.com/cards/xln/${username}`
      : null,
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (username < 6)
      setUsername(username - 1);
      setUsername(username + 1);
      setAutoplaySpeedActive(true);
       
    }, 1000);
    return () => clearInterval(interval);
  }, [username , setAutoplaySpeedActive]);


  if (postLoading) {
    return  'loading...'
  }
  
  if (postData || userData) {
   
    return (
      <div className='container-slider'>
        <CardItem artist={postData.artist} flavor={postData.flavor_text} character={postData.image_uris.art_crop} num={postData.collector_number} username={username} indexAc={indexAc} mana={postData.type_line} />     
        <div className="slider-btn"> 
        {slideData.map((stock, index) => {
             var liClasses = classNames({
                'main-class': true,
                'activeClass': stock._id  ===  username,   
              });

        return ( 
          <> 
            <div className='btn'> 
              <ul>
                  <span key={index} className={liClasses} onClick={(e)=> {
                    e.preventDefault();
                    setUsername(stock._id)
                    setindexActive(stock._id);
                   }}><img src={sliderAc} className="iconOne"/>
                   
                   </span>
                </ul>
            </div>
            </> 
           );
          }   
        )}   
      </div>
      </div>
    )
  }
 
}



export default Slider;
