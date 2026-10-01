import NewsCard from '../NewsCard/NewsCard';

import image01 from '../../images/image_01.png';
import image04 from '../../images/image_04.png';
import image05 from '../../images/image_05.png';
import image07 from '../../images/image_07.png';
import image08 from '../../images/image_08.png';

import './SavedNews.css';

const savedCards = [
  {
    id: 'saved-01',
    image: image01,
    date: '2 de setembro de 2026',
    source: 'The Guardian',
    title: 'Notícias e acontecimentos do mundo',
    description:
      'Confira as principais notícias e acontecimentos recentes.',
    keyword: 'Natureza',
  },
  {
    id: 'saved-02',
    image: image04,
    date: '1 de setembro de 2026',
    source: 'The New York Times',
    title: 'Novas descobertas e informações',
    description:
      'Informações e descobertas que estão em destaque.',
    keyword: 'Natureza',
  },
  {
    id: 'saved-03',
    image: image05,
    date: '31 de agosto de 2026',
    source: 'The Washington Post',
    title: 'O que está acontecendo hoje',
    description:
      'Os principais acontecimentos e notícias do momento.',
    keyword: 'Natureza',
  },
  {
    id: 'saved-04',
    image: image07,
    date: '30 de agosto de 2026',
    source: 'BBC',
    title: 'Informações importantes',
    description:
      'Confira as notícias mais relevantes dos últimos dias.',
    keyword: 'Natureza',
  },
  {
    id: 'saved-05',
    image: image08,
    date: '29 de agosto de 2026',
    source: 'Reuters',
    title: 'Notícias em destaque',
    description:
      'Veja os acontecimentos que estão repercutindo.',
    keyword: 'Natureza',
  },
];

function SavedNews() {
  return (  
    <main className='saved-news'>
      <section className="saved-news__header">
        <p className="saved-news__subtitle">Artigos salvos</p>

        <h1 className="saved-news__title">
          Elise, você tem 5 artigos salvos
        </h1>

        <p className="saved-news__keywords">
          Por palavras-chave:{' '}
          <span className="saved-news__keyword">
            Natureza
          </span>
        </p>
      </section>

      <section className="saved-news__cards">
        <div className="saved-news__grid">
          {savedCards.map((card) => (
            <NewsCard
              key={card.id}
              image={card.image}
              date={card.date}
              source={card.source}
              title={card.title}
              description={card.description}
              keyword={card.keyword}
              isLoggedIn
              isSaved
              showDelete
            />
          ))}
        </div> 
      </section>
    </main>
  );
}

export default SavedNews;