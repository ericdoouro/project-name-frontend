import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
    const [keyword, setKeyword] = useState('');

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedKeyword = keyword.trim();

        if (onSearch) {
            onSearch(trimmedKeyword);
        }
    };

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <label className='search-form__label' htmlFor='search-input'>
                Pesquisar notícias
            </label>

            <div className='search-form__container'>
                <input 
                className='search-form__input'
                id='search-input'
                name='keyword'
                type='search'
                placeholder='Inserir tema'
                value={keyword}
                onChange={handleChange}
                required
                />

                <button 
                    className='search-form__button' 
                    type='submit'
                    disabled={!keyword.trim()}
                >
                    Procurar
                </button>
            </div>
        </form>
    );
}

export default SearchForm;