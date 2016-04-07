export default new Promise((resolve, reject) => {
  
  window.initMap = initMap;

  function initMap() {
    resolve(window.google);
  }

});
