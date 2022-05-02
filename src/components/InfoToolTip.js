import React from 'react';

const InfoToolTip = props => {
  return (
    <div id='infoToolTip' className={props.isOpen ? 'popup popup_opened' : 'popup'}>
      <div className='popup__body popup__body_infoToolTip'>
        <button type='button' aria-label='Закрыть всплывающее окно' className='popup__close' onClick={props.onClose}></button>
        <img className='popup__icon ' src={props.image} />
        <h2 className='popup__description'>{props.title}</h2>
      </div>
    </div>
    // // <div id={props.id} className={props.isOpen ? 'popup popup_opened' : 'popup'}>
    //   {/* <div className='popup__body'> */}
    //     {/* <button type='button' aria-label='Закрыть всплывающее окно' className='popup__close' onClick={props.onClose}></button> */}
    //     {/* <h2 className='popup__title'>{props.title}</h2> */}
    //     {/* <form action='#' method='post' name={props.formName} id={props.formId} className='popup__form' onSubmit={props.onSubmit}> */}
    //       {/* {props.children} */}
    //       {/* <button type='submit' className='popup__submit'> */}
    //         {/* {props.buttonText} */}
    //       {/* </button> */}
    //     {/* </form> */}
    //   {/* </div> */}
    // {/* </div> */}
  );
};

export default InfoToolTip;
