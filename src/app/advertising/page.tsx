import { cookies } from 'next/headers';

const Advertising = async () => {
  const cookeis = await cookies();
  console.log(cookeis.getAll());
  return <div>Advertising</div>;
};

export default Advertising;
