//personal token: b7515436-5dfa-4f13-a09a-5183c1df5fb3

class Api {
  constructor(options) {}

  getUserData() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
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

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
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

  editProfile() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        about: "",
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        link: "",
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/cardId",
      {
        method: "DELETE",
        headers: {
          authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addLike() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/cardId/likes",
      {
        method: "PUT",
        headers: {
          authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteLike() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/cardId/likes",
      {
        method: "DELETE",
        headers: {
          authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfilePic() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
        },
        body: JSON.stringify({
          avater: "",
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
