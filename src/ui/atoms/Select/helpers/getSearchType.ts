import {OptionType, SearchType} from "../types";

export const getSearchType = (option: OptionType, searchTerm: string) => {
    if (!searchTerm) return SearchType.None
    
    const adjustedSearchTerm = searchTerm.toLowerCase().trim();
    const adjustedValue = option.value.toLowerCase().trim();
    const adjustedDisplayValue = option.displayValue?.toLowerCase().trim();
    const adjustedKey = String(option.key).toLowerCase().trim();

    const isSearchedByName = adjustedValue.includes(adjustedSearchTerm)
        || adjustedDisplayValue?.includes(adjustedSearchTerm)
        || adjustedKey.includes(adjustedSearchTerm);

    if (isSearchedByName) return SearchType.ByName

    if (!option.children) return SearchType.None

    const isSearchByChildren = option.children.some((childOption) => getSearchType(childOption, searchTerm) !== SearchType.None)

    return isSearchByChildren ? SearchType.ByChildren : SearchType.None
}