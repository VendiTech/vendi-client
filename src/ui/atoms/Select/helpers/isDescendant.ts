import {OptionType} from "../types";

export const isDescendant = (parent: OptionType, child: OptionType): boolean => parent.children?.some(
    (option) => option.key === child.key || isDescendant(option, child)
) ?? false
