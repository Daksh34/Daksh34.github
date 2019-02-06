

if('serviceWorker' in navigator){
   
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('../sw_cached_pages.1.js')
        .then(reg => console.log('Registered'))
        .catch(err => console.log(`Error : ${err}`))
    });
}