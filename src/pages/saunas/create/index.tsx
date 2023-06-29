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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSauna } from 'apiSdk/saunas';
import { Error } from 'components/error';
import { saunaValidationSchema } from 'validationSchema/saunas';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { SaunaInterface } from 'interfaces/sauna';

function SaunaCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SaunaInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSauna(values);
      resetForm();
      router.push('/saunas');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SaunaInterface>({
    initialValues: {
      type: '',
      door: '',
      window: '',
      wood: '',
      fabric: '',
      roof: '',
      color: '',
      warm_generator: '',
      company_id: (router.query.company_id as string) ?? null,
    },
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
            Create Sauna
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
    operation: AccessOperationEnum.CREATE,
  }),
)(SaunaCreatePage);
