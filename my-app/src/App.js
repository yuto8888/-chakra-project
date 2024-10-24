import React, { useState } from 'react';
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
import PrefectureSelect from './PrefectureSelect'; // 都道府県選択コンポーネント
import ConfirmationModal from './ConfirmationModal'; // 確認モーダル

// 名前のバリデーション関数
const validateName = value => {
  if (!value.lastName) {
    return '姓は必須です'; // 姓が空の場合
  }
  if (!value.firstName) {
    return '名は必須です'; // 名が空の場合
  }
  const fullName = `${value.lastName} ${value.firstName}`;
  if (fullName.length < 1 || fullName.length > 10) {
    return '名前は1文字以上10文字以下'; // フルネームの長さが条件に合わない場合
  }
  return undefined;
};

// 性別のバリデーション関数
const validateGender = value => {
  if (!value) {
    return '性別は必須です'; // 性別が選択されていない場合
  }
  return undefined;
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});

  // モーダルを閉じる関数
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    console.log('登録されました:', submittedData);
    handleClose();
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
            name: { firstName: '', lastName: '' }, // 姓と名の初期値
            gender: '',
            age: 1,
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
        >
          {({ handleChange, setFieldValue, values }) => (
            <Form>
              {/* 名前*/}
              <FormControl id="name" mb={4}>
                <FormLabel>名前</FormLabel>
                <Field name="name" validate={validateName}>
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

              {/* 性別 */}
              <FormControl id="gender" mb={4}>
                <FormLabel>性別</FormLabel>
                <Field name="gender" validate={validateGender}>
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

              {/* 年齢 */}
              <FormControl id="age" mb={4}>
                <FormLabel>年齢</FormLabel>
                <Field name="age">
                  {() => (
                    <NumberInput
                      value={values.age}
                      onChange={value => setFieldValue('age', parseInt(value))}
                      min={0}
                      max={120}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                </Field>
              </FormControl>

              {/* 出身 */}
              <Field name="prefecture">
                {() => (
                  <PrefectureSelect
                    value={values.prefecture}
                    onChange={e => setFieldValue('prefecture', e.target.value)}
                  />
                )}
              </Field>

              {/* 自己PR */}
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
              </FormControl>

              {/* 登録ボタン */}
              <Flex justifyContent="flex-end" mt={4}>
                <Button colorScheme="green" type="submit">
                  登録
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>

      {/* モーダル */}
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
