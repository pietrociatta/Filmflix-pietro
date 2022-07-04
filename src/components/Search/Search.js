import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const [query, setquery] = useState('');
  const dispatch = useDispatch();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log(query);
      dispatch(searchMovie(query));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cerca un film..."
        class="input w-[40vw]"
        value={query}
        onChange={(e) => setquery(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </div>
  );
};

export default Search;
