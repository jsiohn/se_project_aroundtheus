//personal token: b7515436-5dfa-4f13-a09a-5183c1df5fb3

class Api {
  constructor(options) {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
