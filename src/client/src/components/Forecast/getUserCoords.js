const getUserCoords = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          resolve({
            lat: latitude,
            long: longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject("geolocation API not supported :(");
    }
  });
};

export default getUserCoords;
