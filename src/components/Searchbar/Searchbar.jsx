import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { BsSearch } from 'react-icons/bs';
import { Searchbars, Searchform,SearchButton,SearchButtonLabel,SearchInput } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Please enter a search query');
    }
    else {
      this.props.handleFormSubmit(searchQuery);
      this.setState({ searchQuery: '' });
    }
  };

  render() {
    return (
      <Searchbars>
        <Searchform role="search" onSubmit={this.handleSubmit}>
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
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </Searchform>
      </Searchbars>
    );
  }
}
