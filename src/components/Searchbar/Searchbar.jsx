import {useState} from 'react';
import Notiflix from 'notiflix';
import { BsSearch } from 'react-icons/bs';
import { Searchbars, Searchform,SearchButton,SearchButtonLabel,SearchInput } from './Searchbar.styled';

export default function Searchbar({handleFormSubmit}) {

  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = e => {
    const { value } = e.target;
    setSearchQuery(value)

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Please enter a search query');
    }
    else {
      handleFormSubmit(searchQuery);
      setSearchQuery('') ;
    }
  };

    return (
      <Searchbars>
        <Searchform role="search" onSubmit={handleSubmit}>
          <SearchButton type="submit" >
            <BsSearch>
              <SearchButtonLabel>Search</SearchButtonLabel>
            </BsSearch>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChange}
          />
        </Searchform>
      </Searchbars>
    );
  }

