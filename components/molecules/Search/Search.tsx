import React, { useEffect, useMemo } from 'react';
import {
  FilterContainer,
  FilterIconView,
  FilterRightIconView,
  SearchInputContainer,
} from './Search.styles';
import TextInput from '@atoms/TextInput/TextInput';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';
import Search from '@atoms/Illustrations/Search';
import { SearchFilterProps } from './Search.props';
import { useDebounce } from '@utils/useDebounce';
import isEmpty from 'lodash/isEmpty';
import { debounceTime } from '@utils/constant';

const SearchFilter: React.FC<SearchFilterProps> = ({
  setSearch,
  search,
  handleSearch,
  rightIcon,
  onRightIconPress,
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
  useEffect(() => {
    handleSearch(searchFilter);
  }, [debouncedSearch]);
  return (
    <FilterContainer>
      <SearchInputContainer>
        <TextInput
          mode="outlined"
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder={ts('searchUsers')}
          style={[
            {
              backgroundColor: colors.snowflake,
              borderRadius: 25,
              overflow: 'hidden',
              borderColor: colors.primaryColor,
              paddingLeft: -20,
              paddingRight: 40,
            },
          ]}
          textColor={colors.textDark}
          outlineColor="transparent"
          outlineStyle={{ borderWidth: 0 }}
          left={<Search />}
        />
        <FilterIconView>
          <Search />
        </FilterIconView>
        {rightIcon && (
          <FilterRightIconView onPress={onRightIconPress}>
            {rightIcon}
          </FilterRightIconView>
        )}
      </SearchInputContainer>
    </FilterContainer>
  );
};

export default SearchFilter;
