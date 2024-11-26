// import { FormWrapper } from '@/lib/providers/FormProvider/FormProvider';
// import { Card, Stack } from '@mui/material';
// import { Company, UserInfo } from '../../AccountInfo';

// type Props = {
//   data: UserDetail;
//   handler: UseMutateAsyncFunction<
//     AxiosResponse<UserDetail, any>,
//     Error,
//     UpdateAccountSchema,
//     unknown
//   >;
// };

// const flexboxChildrenSx: SxProps<Theme> = {
//   minWidth: { mobile: 200, tablet: 300 },
// };

// export const AccountInfoForm = (props: Props) => {
//   const { data, handler } = props;

//   const schema = useAccountSchema();

//   const onSubmit = async (params: UpdateAccountSchema) => {
//     try {
//       await handler({
//         ...params,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <FormWrapper
//       schema={schema}
//       defaultValues={data as UpdateAccountSchema}
//       onSubmit={onSubmit}
//       dirtyOnly>
//       <LoadingContent>
//         <Stack spacing={2}>
//           <Company operator={}/>

//           <UserInfo />
//         </Stack>
//       </LoadingContent>
//     </FormWrapper>
//   );
// };
