import ProductIcon from '@/assets/icons/BagShopping.svg';
import { ParamsNames } from '../helpers/params-names';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useProductFilters } from '../helpers/use-product-filters';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';

export const ProductFilter = () => {
  const { product } = useGlobalFilters();
  const productFilters = useProductFilters();
  const handleParamChange = useHandleParamChange();
  
  const selectedProduct = product ?? [productFilters[0].id];

  useValidateUrl(ParamsNames.Product, product, productFilters);

  return (
    <BaseFilter
      multiple
      onChange={(e) =>
        handleParamChange(ParamsNames.Product, e.target.value as string[])
      }
      icon={<ProductIcon width={16} height={16} />}
      options={productFilters.map((category) => ({
        key: category.id,
        value: String(category.id),
        displayValue: category.name,
        children: category.children.map((product) => ({
          key: product.id,
          value: String(product.id),
          displayValue: product.name,
        }))
      }))}
      value={selectedProduct}
      displayValue={
        product
          ? productFilters
              .filter((item) => product.includes(String(item.id)))
              .map((item) => item.name)
              .join(', ')
          : productFilters[0].name
      }
    />
  );
};
