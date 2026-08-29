/**
 * CountrySelector Component
 *
 * Searchable dropdown for selecting a country.
 */

'use client';

import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FIELD_LIMITS } from '@constants';

import { COUNTRIES } from '../../ProfileEditScreen.countries';
import type { CountrySelectorProps } from './CountrySelector.interfaces';
import { UI_TEXT } from '../../ProfileEditScreen.constants';

import {
  CountryDropdown,
  CountryDropdownIcon,
  CountryInput,
  CountryOption,
  CountrySelectorWrapper,
  NoResults,
} from '../../ProfileEditScreen.styled';

export const CountrySelector = ({ onChange, value }: CountrySelectorProps) => {
  const { t } = useTranslation();
  const [countrySearch, setCountrySearch] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const normalize = (text: string) =>
      text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    const searchNormalized = normalize(countrySearch);
    return COUNTRIES.filter((country) => normalize(country).includes(searchNormalized));
  }, [countrySearch]);

  useEffect(() => {
    setCountrySearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setCountrySearch(value);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const selectCountry = useCallback(
    (country: string) => {
      onChange(country);
      setCountrySearch(country);
      setIsDropdownOpen(false);
    },
    [onChange]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCountrySearch(e.target.value);
    setIsDropdownOpen(true);
    setHighlightedIndex(0);
  }, []);

  const handleSelect = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const { country } = e.currentTarget.dataset;
      if (country) selectCountry(country);
    },
    [selectCountry]
  );

  const handleFocus = useCallback(() => {
    setIsDropdownOpen(true);
    setCountrySearch('');
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isDropdownOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') setIsDropdownOpen(true);
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.min(prev + 1, filteredCountries.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCountries[highlightedIndex])
            selectCountry(filteredCountries[highlightedIndex]);
          break;
        case 'Escape':
          setIsDropdownOpen(false);
          setCountrySearch(value);
          break;
      }
    },
    [isDropdownOpen, filteredCountries, highlightedIndex, selectCountry, value]
  );

  return (
    <CountrySelectorWrapper>
      <CountryInput
        maxLength={FIELD_LIMITS.COUNTRY}
        placeholder={UI_TEXT.PLACEHOLDERS.COUNTRY_SEARCH}
        ref={inputRef}
        type='text'
        value={countrySearch}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      <CountryDropdownIcon $isOpen={isDropdownOpen}>
        <ChevronDown size={16} />
      </CountryDropdownIcon>
      <CountryDropdown $isOpen={isDropdownOpen} ref={dropdownRef}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <CountryOption
              $isHighlighted={index === highlightedIndex}
              data-country={country}
              key={country}
              onClick={handleSelect}
            >
              {country}
            </CountryOption>
          ))
        ) : (
          <NoResults>{t('public.profile.noCountriesFound')}</NoResults>
        )}
      </CountryDropdown>
    </CountrySelectorWrapper>
  );
};
