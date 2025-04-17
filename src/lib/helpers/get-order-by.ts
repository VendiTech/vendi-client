type Params = {
  orderBy?: string | null;
  orderDirection?: string | null;
}

export const getOrderBy = ({orderBy, orderDirection}: Params) => {
  const direction = orderDirection === 'asc' ? '-' : '';
  console.log(orderDirection)
  const field = orderBy?.toLowerCase()
  
  return field ? `${direction}${field}` : undefined;
}