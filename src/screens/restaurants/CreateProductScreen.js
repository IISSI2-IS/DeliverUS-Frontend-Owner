import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import { brandBackground, brandPrimary, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import defaultProduct from '../../../assets/product.jpeg'
import { getProductCategories, create } from '../../api/ProductEndpoints'
import { showMessage } from 'react-native-flash-message'
import DropDownPicker from 'react-native-dropdown-picker'
import * as yup from 'yup'
import { Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateProductScreen ({ navigation, route }) {
  const [open, setOpen] = useState(false)
  const [productCategories, setProductCategories] = useState([])
  const [backendErrors, setBackendErrors] = useState()

  const initialProductValues = { name: '', description: '', price: 0, order: 0, restaurantId: route.params.id, productCategoryId: null, availability: true }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(30, 'Name too long')
      .required('Name is required'),
    price: yup
      .number()
      .positive('Please provide a positive price value')
      .required('Price is required'),
    order: yup
      .number()
      .positive('Please provide a positive cost value')
      .integer('Please provide an integer cost value')
  })

  useEffect(() => {
    async function fetchProductCategories () {
      try {
        const fetchedProductCategories = await getProductCategories()
        const fetchedProductCategoriesReshaped = fetchedProductCategories.map((e) => {
          return {
            label: e.name,
            value: e.id
          }
        })
        setProductCategories(fetchedProductCategoriesReshaped)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving product categories. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    fetchProductCategories()
  }, [])
  const pickImage = async (onSuccess) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.cancelled) {
      if (onSuccess) {
        onSuccess(result)
      }
    }
  }

  const createProduct = async (values) => {
    setBackendErrors([])
    try {
      console.log(values)
      const createdProduct = await create(values)
      showMessage({
        message: `Product ${createdProduct.name} succesfully created`,
        type: 'success',
        style: flashStyle,
        titleStyle: flashTextStyle
      })
      navigation.navigate('RestaurantDetailScreen', { id: route.params.id, dirty: true })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialProductValues}
      onSubmit={createProduct}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />
              <InputItem
                name='description'
                label='Description:'
              />
              <InputItem
                name='price'
                label='Price:'
              />
              <InputItem
                name='order'
                label='Order/position to be rendered:'
              />

              <DropDownPicker
                open={open}
                value={values.productCategoryId}
                items={productCategories}
                setOpen={setOpen}
                onSelectItem={item => {
                  setFieldValue('productCategoryId', item.value)
                }}
                setItems={setProductCategories}
                placeholder="Select the product category"
                containerStyle={{ height: 40, marginTop: 20, marginBottom: 20 }}
                style={{ backgroundColor: brandBackground }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
              />

              <TextRegular>Is it available?</TextRegular>
              <Switch
                trackColor={{ false: brandSecondary, true: brandPrimary }}
                thumbColor={values.availability ? brandSecondary : '#f4f3f4'}
                // onValueChange={toggleSwitch}
                value={values.availability}
                style={styles.switch}
                onValueChange={value =>
                  setFieldValue('availability', value)
                }
              />

              <Pressable onPress={() =>
                pickImage(
                  async result => {
                    await setFieldValue('image', result)
                  }
                )
              }
                style={styles.imagePicker}
              >
                <TextRegular>Product image: </TextRegular>
                <Image style={styles.image} source={values.image ? { uri: values.image.uri } : defaultProduct} />
              </Pressable>

              {backendErrors &&
                backendErrors.map((error, index) => <TextError key={index}>{error.msg}</TextError>)
              }

              <Pressable
                onPress={ handleSubmit }
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? brandPrimaryTap
                      : brandPrimary
                  },
                  styles.button
                ]}>
                <TextRegular textStyle={styles.text}>
                  Create product
                </TextRegular>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center'
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  switch: {
    marginTop: 5
  }
})
