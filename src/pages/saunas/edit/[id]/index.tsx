import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getSaunaById, updateSaunaById } from 'apiSdk/saunas';
import { Error } from 'components/error';
import { saunaValidationSchema } from 'validationSchema/saunas';
import { SaunaInterface } from 'interfaces/sauna';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';

function SaunaEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SaunaInterface>(
    () => (id ? `/saunas/${id}` : null),
    () => getSaunaById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SaunaInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSaunaById(id, values);
      mutate(updated);
      resetForm();
      router.push('/saunas');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SaunaInterface>({
    initialValues: data,
    validationSchema: saunaValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Sauna
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="type" mb="4" isInvalid={!!formik.errors?.type}>
              <FormLabel>Type</FormLabel>
              <Input type="text" name="type" value={formik.values?.type} onChange={formik.handleChange} />
              {formik.errors.type && <FormErrorMessage>{formik.errors?.type}</FormErrorMessage>}
            </FormControl>
            <FormControl id="door" mb="4" isInvalid={!!formik.errors?.door}>
              <FormLabel>Door</FormLabel>
              <Input type="text" name="door" value={formik.values?.door} onChange={formik.handleChange} />
              {formik.errors.door && <FormErrorMessage>{formik.errors?.door}</FormErrorMessage>}
            </FormControl>
            <FormControl id="window" mb="4" isInvalid={!!formik.errors?.window}>
              <FormLabel>Window</FormLabel>
              <Input type="text" name="window" value={formik.values?.window} onChange={formik.handleChange} />
              {formik.errors.window && <FormErrorMessage>{formik.errors?.window}</FormErrorMessage>}
            </FormControl>
            <FormControl id="wood" mb="4" isInvalid={!!formik.errors?.wood}>
              <FormLabel>Wood</FormLabel>
              <Input type="text" name="wood" value={formik.values?.wood} onChange={formik.handleChange} />
              {formik.errors.wood && <FormErrorMessage>{formik.errors?.wood}</FormErrorMessage>}
            </FormControl>
            <FormControl id="fabric" mb="4" isInvalid={!!formik.errors?.fabric}>
              <FormLabel>Fabric</FormLabel>
              <Input type="text" name="fabric" value={formik.values?.fabric} onChange={formik.handleChange} />
              {formik.errors.fabric && <FormErrorMessage>{formik.errors?.fabric}</FormErrorMessage>}
            </FormControl>
            <FormControl id="roof" mb="4" isInvalid={!!formik.errors?.roof}>
              <FormLabel>Roof</FormLabel>
              <Input type="text" name="roof" value={formik.values?.roof} onChange={formik.handleChange} />
              {formik.errors.roof && <FormErrorMessage>{formik.errors?.roof}</FormErrorMessage>}
            </FormControl>
            <FormControl id="color" mb="4" isInvalid={!!formik.errors?.color}>
              <FormLabel>Color</FormLabel>
              <Input type="text" name="color" value={formik.values?.color} onChange={formik.handleChange} />
              {formik.errors.color && <FormErrorMessage>{formik.errors?.color}</FormErrorMessage>}
            </FormControl>
            <FormControl id="warm_generator" mb="4" isInvalid={!!formik.errors?.warm_generator}>
              <FormLabel>Warm Generator</FormLabel>
              <Input
                type="text"
                name="warm_generator"
                value={formik.values?.warm_generator}
                onChange={formik.handleChange}
              />
              {formik.errors.warm_generator && <FormErrorMessage>{formik.errors?.warm_generator}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<CompanyInterface>
              formik={formik}
              name={'company_id'}
              label={'Select Company'}
              placeholder={'Select Company'}
              fetcher={getCompanies}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sauna',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SaunaEditPage);
