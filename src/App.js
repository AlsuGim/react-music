import './App.scss';
import Cart from './components/Cart';
import React from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = React.useState([]);
  const [store, setStore] = React.useState([]);
  const [favorite, setFavorites] = React.useState([]);
  
  React.useEffect(() => {
    axios.get('https://639dec933542a26130531995.mockapi.io/music').then((res) => { setItems(res.data); });
  }, []);

  function onRemoveItem(id) {
    setItems((prev) => prev.filter(item => item.id !== id));
    setFavorites((prev) => prev.filter(item => item.id !== id));
    setStore((prev) => prev.filter(item => item.id !== id));
    check()
  }
  const onShow=(favorite)=>{
    if(favorite.length===0)
    {
      const box = `
      <div id='box'>
        <p>У вас нет любимых альбов</p>
      </div>`;
      document.getElementById('groupCart').innerHTML = box;
    }
    else{
    setStore(items);
    setItems(favorite);
    for(var i=0; i<favorite.length; i++){
      document.getElementsByClassName("cartHeart")[i].setAttribute("src", "img/heart.png")
      }
  }
    document.getElementById("btnBack").setAttribute("style", "display: inline-block");
  } 

  async function onShow2(store)
  {
    await setItems(store);
    for(var i=0; i<items.length; i++){
      document.getElementsByClassName("cartHeart")[i].setAttribute("src", "img/love.png")
      } 
    check()
  } 
  function check (){
    for(var j=0; j<store.length; j++){
    for(var i=0; i<favorite.length; i++){
        if(store[j].name===favorite[i].name)
          {
            document.getElementsByClassName("cartHeart")[j].setAttribute("src", "img/heart.png")
            break;
      }}}
  }
  const onAddToFavorite = (obj) => {
     try {
      if (favorite.find((favObj) => favObj.id === obj.id)) {
         setFavorites((prev) => prev.filter(item => item.id !== obj.id));
         document.getElementsByClassName("cartHeart")[obj.id-1].setAttribute("src", "img/love.png")
        console.log(favorite);
      } 
       else {
        setFavorites((prev) => [...prev, obj]);
        document.getElementsByClassName("cartHeart")[obj.id-1].setAttribute("src", "img/heart.png")
        console.log(favorite);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };
  return (
    <div >
    <header> 
                <div className='headerLeft'>
                    <img alt="logo" width={40} height={40} src='/img/image 4 (1).png' />
                    <div className="headerInfo">
                        <h3>React Music</h3>
                        <p>Ваши любимые альбомы</p>
                    </div>
                </div> 
            <ul className="headerRight">
              <li className='headerLi'>
              
              <img id='btnBack' onClick={() => onShow2(store)}  alt="назад" width={18} height={18} src='img/back.png' style={{display:'none'}}/>
              </li>
                <li className='headerLi'>
                        <img onClick={() => onShow(favorite)} alt="закладки" width={18} height={18} src='img/likes.svg' />
                </li>
            </ul>
        </header>
    <div id='groupCart'>
    {
      items.map((item,index) =>
       
        <Cart
          key={index}
          onRemove={onRemoveItem}
          onFavorite={onAddToFavorite}
          item={item} />
      )
    }
   </div></div>
  );
}

export default App;
