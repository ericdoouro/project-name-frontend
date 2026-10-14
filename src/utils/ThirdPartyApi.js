const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://nomoreparties.co/news/v2/everything';

class ThirdPartyApi {
  getNews(keyword) {
    const today = new Date();
    const from = new Date();

    from.setDate(today.getDate() - 7);

    const params = new URLSearchParams({
      q: keyword,
      from: from.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0],
      pageSize: '100',
      apiKey: API_KEY,
    });

    return fetch(`${BASE_URL}?${params}`)
      .then((res) =>
        res.json().then((data) => {
            if (!res.ok) {
            throw new Error(data.message || `Erro: ${res.status}`);
            }

            return data;
        }),
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }
}

const thirdPartyApi = new ThirdPartyApi();

export default thirdPartyApi;