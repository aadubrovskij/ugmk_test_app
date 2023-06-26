
export const getRequestsData = () => {
  // поскольку требований об отработке ошибок не было - игнорируем

  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/products').then(response => {
      if (response.ok) {
        response.json().then(res => {
          resolve(res);
        })
      } else {
        reject();
      }
    }, (e) => {
      console.error(e);
      reject();
    })
  })
}
