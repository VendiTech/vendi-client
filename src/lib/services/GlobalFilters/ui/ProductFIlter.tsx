import ProductIcon from '@/assets/icons/BagShopping.svg';
import { ParamsNames } from '../helpers/params-names';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useProductFilters } from '../helpers/use-product-filters';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';
import {
  createNestedSelectOption,
  getNestedSelectedOptions,
} from '@/ui/atoms/Select';

type Props = {
  showLabel?: boolean;
};

export const ProductFilter = ({ showLabel = true }: Props) => {
  const handleParamChange = useHandleParamChange();

  const { product, productItem } = useGlobalFilters();
  const productFilters = useProductFilters();

  useValidateUrl(ParamsNames.Product, product, productFilters);

  const handleChange = (products: string[]) => {
    handleParamChange([
      {
        paramName: ParamsNames.ProductItem,
        newParamValue: getNestedSelectedOptions(products, 1),
      },
      {
        paramName: ParamsNames.Product,
        newParamValue: getNestedSelectedOptions(products, 0),
      },
    ]);
  };

  const value =
    !product && !productItem
      ? []
      : [
          ...(product ?? []).map((item) => createNestedSelectOption(item, 0)),
          ...(productItem ?? []).map((item) =>
            createNestedSelectOption(item, 1),
          ),
        ];

  return (
    <BaseFilter
      showSearch
      showClearButton
      multiple
      label={showLabel ? 'Product' : undefined}
      onChange={(e) => handleChange(e.target.value as string[])}
      icon={<ProductIcon width={16} height={16} />}
      isNested
      options={productFilters.map((category) => ({
        key: category.id,
        value: String(category.id),
        displayValue: category.name,
        children: category.children.map((product) => ({
          key: product.id,
          value: String(product.id),
          displayValue: product.name,
        })),
      }))}
      value={value}
      displayValue={
        product
          ? productFilters
              .filter((item) => product.includes(String(item.id)))
              .map((item) => item.name)
              .join(', ')
          : 'All products'
      }
    />
  );
};
