const BASE_URL = 'https://project-name-backend.vercel.app';

class MainApi {
  signup({ email, password, name }) {
    return fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Erro ao criar usuário');
          });
        }

        return res.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  signin({ email, password }) {
    return fetch(`${BASE_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Erro ao fazer login');
          });
        }

        return res.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  getUser(token) {
    return fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Erro ao obter usuário');
          });
        }

        return res.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  getArticles(token) {
    return fetch(`${BASE_URL}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Erro ao obter artigos');
          });
        }

        return res.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  saveArticle(article, token) {
    return fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Erro ao salvar artigo');
          });
        }

        return res.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  deleteArticle(articleId, token) {
    return fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Erro ao excluir artigo');
          });
        }

        return res.json();
      })
      .catch((error) => {
        throw error;
      });
  }
}

const mainApi = new MainApi();

export default mainApi;
