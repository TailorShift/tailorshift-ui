import * as React from 'react';
import { Grid, GridItem, PageSection, Title } from '@patternfly/react-core';
import { ProductSearch } from './components/ProductSearch';
import { Cart } from './components/Cart';
import { PosApi, Configuration } from '@app/api';
import { CustomerPane } from './components/CustomerInfo';

const Dashboard: React.FunctionComponent = () => {
  const [product, setProduct] = React.useState();
  const [cartItems, setCartItems] = React.useState([]);
  const [customer, setCustomer] = React.useState();

  const configuration = new Configuration({ basePath: 'http://localhost:8080' })
  const apiClient = new PosApi(configuration);

  const addCartItem = (product, type) => {
    setCartItems((cartItems) => [...cartItems, { product: product, type: type }])
  }

  return <PageSection>
    <Grid hasGutter>
      <GridItem span={8}>
        <ProductSearch apiClient={apiClient} product={product} setProduct={setProduct} addCartItem={addCartItem}></ProductSearch>
      </GridItem>
      <GridItem span={4}>
        <CustomerPane apiClient={apiClient} customer={customer} setCustomer={setCustomer}></CustomerPane>
        <Cart apiClient={apiClient} cartItems={cartItems} setCartItems={setCartItems}></Cart>
      </GridItem>
    </Grid>
  </PageSection>
}

export { Dashboard };
