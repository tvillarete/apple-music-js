class ApiClass {
  constructor() {
    this.url = `https://05aacd63.ngrok.io/api`;
  }

  makeRequest = ({ url, data }) => {
    return new Promise(function(resolve, reject) {
      fetch(url, data)
        .then(response => {
          response.json().then(data => {
            if (response.status >= 300) {
              reject(data.message);
            }
            resolve(data);
          });
        })
        .catch(e => {
          reject(Error(e));
        });
    });
  };

  fetchArtists = () => {
    return this.makeRequest({
      url: `${this.url}/artists`,
      data: {
        method: "GET"
      }
    });
  };

  fetchArtist = artist => {
    return this.makeRequest({
      url: `${this.url}/artist/${artist}`,
      data: {
        method: "GET"
      }
    });
  };

  fetchAlbums = () => {
    return this.makeRequest({
      url: `${this.url}/albums`,
      data: {
        method: "GET"
      }
    });
  };

  fetchAlbum = ({ album }) => {
    return this.makeRequest({
      url: `${this.url}/album/${album}`,
      data: {
        method: "GET"
      }
    });
  };
}

const Api = new ApiClass();
export default Api;
