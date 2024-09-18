import React, { useEffect, useMemo } from 'react';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';
import Search from '@atoms/Illustrations/Search';
import { useDebounce } from '@utils/useDebounce';
import isEmpty from 'lodash/isEmpty';
import { debounceTime } from '@utils/constant';
import { SearchFilterProps } from './Search.props';
import {
  FilterContainer,
  FilterIconView,
  FilterRightIconView,
  SearchInputContainer,
  SearchTextInput,
} from './Search.styles';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';

const SearchFilter: React.FC<SearchFilterProps> = ({
  setSearch,
  search,
  handleSearch,
  rightIcon,
  onRightIconPress,
  searchRadius,
  dropdownDataType,
}) => {
  const { t: ts } = useTranslation('drawer');
  const { colors } = useAppTheme();
  const debouncedSearch = useDebounce(search || undefined, debounceTime);

  const searchFilter = useMemo(() => {
    if (isEmpty(search)) {
      return {};
    }
    const filtersValue = {};
    filtersValue['search'] = search;
    return filtersValue;
  }, [search, debouncedSearch]);
  const placeholderText = useMemo(() => {
    switch (dropdownDataType) {
      case DropdownDataType.COUNTRY:
        return ts('searchCountries');
      case DropdownDataType.USERS:
        return ts('searchUsers');
      case DropdownDataType.SERVICES:
        return ts('searchServices');
      case DropdownDataType.LEADS:
        return ts('searchLeads');
      default:
        return ts('searchUsers');
    }
  }, [dropdownDataType]);

  useEffect(() => {
    handleSearch?.(searchFilter);
  }, [debouncedSearch]);
  return (
    <FilterContainer>
      <SearchInputContainer>
        <SearchTextInput
          mode="outlined"
          value={search}
          onChangeText={setSearch}
          placeholder={placeholderText}
          textColor={colors.textDark}
          outlineColor="transparent"
          outlineStyle={{ borderWidth: 0 }}
          left={<Search />}
          searchRadius={searchRadius}
        />
        <FilterIconView>
          <Search />
        </FilterIconView>
        {rightIcon && onRightIconPress && (
          <FilterRightIconView onPress={onRightIconPress}>
            {rightIcon}
          </FilterRightIconView>
        )}
      </SearchInputContainer>
    </FilterContainer>
  );
};

export default SearchFilter;
