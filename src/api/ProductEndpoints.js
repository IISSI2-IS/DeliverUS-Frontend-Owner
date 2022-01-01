import { get, post } from './helpers/ApiRequestsHelper'

function getProductCategories () {
  return get('productCategories')
}

function create (data) {
  return post('/products/', data)
}

export { getProductCategories, create }
