import React from 'react';
function Cart({onRemove, onFavorite, item}){
    return(
<div class="product-inner"> 
    <div className="product-wrap">
      <img src={item.avatar}/>
      <div class="actions">
        <img onClick={() => onRemove(item.id)} src="img/delete.png"/>
       
        <img className="cartHeart" onClick={() => onFavorite(item)}  src="img/love.png"/>
      </div></div>
      <div className="product-info">
      <p className="product-title">Название музыкального альбома: "{item.name}"</p>
    </div>
</div>
    
    )
}

export default Cart;