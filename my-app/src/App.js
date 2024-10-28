import React, { useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PrefectureSelect from './PrefectureSelect';
import ConfirmationModal from './ConfirmationModal';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    axios
      .post('http://localhost:3000/submit', submittedData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        console.log('サーバーからのレスポンス:', response.data);
        alert('登録が完了しました');
        handleClose();
      })
      .catch(error => {
        console.error('送信エラー:', error);
        alert('登録に失敗しました');
        handleClose();
      });
  };

  return (
    <ChakraProvider>
      <Box
        p={8}
        maxWidth="600px"
        margin="0 auto"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        mt={16}
      >
        <Formik
          initialValues={{
            name: { firstName: '', lastName: '' },
            gender: '',
            age: '',
            prefecture: '',
            selfIntro: '',
          }}
          onSubmit={values => {
            setSubmittedData({
              fullName: `${values.name.lastName} ${values.name.firstName}`,
              gender: values.gender,
              age: values.age,
              prefecture: values.prefecture,
              selfIntro: values.selfIntro,
            });
            setIsOpen(true);
          }}
          validate={values => {
            const errors = {};
            if (!values.name.lastName && !values.name.firstName) {
              errors.name = '名前は必須です';
            } else if (!values.name.lastName) {
              errors.name = '姓は必須です';
            } else if (!values.name.firstName) {
              errors.name = '名は必須です';
            }
            if (!values.gender) {
              errors.gender = '性別は必須です';
            }
            if (!values.age) {
              errors.age = '年齢は必須です';
            } else if (values.age < 0 || values.age > 100) {
              errors.age = '年齢は0以上100以下でなければなりません';
            }
            if (!values.prefecture) {
              errors.prefecture = '出身は必須です';
            }
            if (!values.selfIntro) {
              errors.selfIntro = '自己PRは必須です';
            } else if (values.selfIntro.length > 100) {
              errors.selfIntro = '自己PRは100文字以内で入力してください';
            }
            return errors;
          }}
        >
          {({ handleChange, setFieldValue, values }) => (
            <Form>
              <FormControl id="name" mb={4}>
                <FormLabel>名前</FormLabel>
                <Field name="name">
                  {() => (
                    <>
                      <Input
                        placeholder="姓"
                        value={values.name.lastName}
                        onChange={e =>
                          setFieldValue('name', {
                            ...values.name,
                            lastName: e.target.value,
                          })
                        }
                        mb={2}
                      />
                      <Input
                        placeholder="名"
                        value={values.name.firstName}
                        onChange={e =>
                          setFieldValue('name', {
                            ...values.name,
                            firstName: e.target.value,
                          })
                        }
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        style={{ color: 'red' }}
                      />
                    </>
                  )}
                </Field>
              </FormControl>

              <FormControl id="gender" mb={4}>
                <FormLabel>性別</FormLabel>
                <Field name="gender">
                  {() => (
                    <>
                      <RadioGroup
                        onChange={value => setFieldValue('gender', value)}
                        value={values.gender}
                      >
                        <Stack direction="row">
                          　<Radio value="1">男性</Radio>
                          <Radio value="2">女性</Radio>
                          <Radio value="3">その他</Radio>
                        </Stack>
                      </RadioGroup>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        style={{ color: 'red' }}
                      />
                    </>
                  )}
                </Field>
              </FormControl>

              <FormControl id="age" mb={4}>
                <FormLabel>年齢</FormLabel>
                <Field name="age">
                  {() => (
                    <>
                      <NumberInput
                        value={values.age}
                        onChange={value =>
                          setFieldValue('age', parseInt(value))
                        }
                        min={0}
                        max={100}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <ErrorMessage
                        name="age"
                        component="div"
                        style={{ color: 'red' }}
                      />
                    </>
                  )}
                </Field>
              </FormControl>

              <Field name="prefecture">
                {() => (
                  <PrefectureSelect
                    value={values.prefecture}
                    onChange={e => setFieldValue('prefecture', e.target.value)}
                  />
                )}
              </Field>

              <FormControl id="self-intro" mb={4}>
                <FormLabel>自己PR</FormLabel>
                <Field name="selfIntro">
                  {() => (
                    <Textarea
                      placeholder="自己PRを入力してください"
                      value={values.selfIntro}
                      onChange={e => setFieldValue('selfIntro', e.target.value)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="selfIntro"
                  component="div"
                  style={{ color: 'red' }}
                />
              </FormControl>

              <Flex justifyContent="flex-end" mt={4}>
                <Button mr={2} colorScheme="red" type="reset" width="70px">
                  クリア　
                </Button>
                <Button colorScheme="green" type="submit" width="70px">
                  登録
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        submittedData={submittedData}
        onConfirm={handleConfirm}
      />
    </ChakraProvider>
  );
};

export default App;
