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

const validateName = value => {
  if (!value.lastName || !value.firstName) {
    return '名前は必須です'; // 名前が空の場合のエラーメッセージ
  }
  const fullName = `${value.lastName} ${value.firstName}`;
  if (fullName.length < 1 || fullName.length > 10) {
    return '名前は1文字以上10文字以下'; // フルネームの長さが条件に合わない場合はエラーメッセージを返す
  }
  return undefined;
};

const App = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(1);
  const [prefecture, setPrefecture] = useState('');
  const [selfIntro, setSelfIntro] = useState('');
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
            name: { firstName: '', lastName: '' }, // 名前だけの初期値
          }}
          onSubmit={values => {
            setSubmittedData({
              fullName: `${values.name.lastName} ${values.name.firstName}`,
              gender,
              age,
              prefecture,
              selfIntro,
            });
            setIsOpen(true);
          }}
        >
          {({ handleChange, setFieldValue, values }) => (
            <Form>
              {/* 名前 */}
              <FormControl id="name" mb={4}>
                <FormLabel>名前</FormLabel>
                <Field name="name" validate={validateName}>
                  {() => (
                    <>
                      <Input
                        placeholder="苗字"
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
                        placeholder="名前"
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
                <RadioGroup onChange={setGender} value={gender}>
                  <Stack direction="row">
                    <Radio value="男性">男性</Radio>
                    <Radio value="女性">女性</Radio>
                    <Radio value="その他">その他</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              {/* 年齢 */}
              <FormControl id="age" mb={4}>
                <FormLabel>年齢</FormLabel>
                <NumberInput
                  value={age}
                  onChange={value => setAge(parseInt(value))}
                  min={0}
                  max={120}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              {/* 出身 */}
              <PrefectureSelect
                value={prefecture}
                onChange={e => setPrefecture(e.target.value)}
              />

              {/* 自己PR */}
              <FormControl id="self-intro" mb={4}>
                <FormLabel>自己PR</FormLabel>
                <Textarea
                  placeholder="自己PRを入力してください"
                  value={selfIntro}
                  onChange={e => setSelfIntro(e.target.value)}
                />
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
