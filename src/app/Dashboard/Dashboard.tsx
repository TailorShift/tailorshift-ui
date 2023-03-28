import * as React from 'react';
import { Button, Grid, GridItem, PageSection, Title, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { ProductSearch } from './components/ProductSearch';
import { Cart } from './components/Cart';
import { PosApi, Configuration } from '@app/api';
import { CustomerPane } from './components/CustomerPane';
import { TimesIcon, TrashIcon } from '@patternfly/react-icons';

const Dashboard: React.FunctionComponent = () => {
  const [product, setProduct] = React.useState();
  const [cartItems, setCartItems] = React.useState([]);
  const [customer, setCustomer] = React.useState();

  const configuration = new Configuration({ basePath: 'http://localhost:8080' })
  const apiClient = new PosApi(configuration);

  const addCartItem = (product, type) => {
    setCartItems((cartItems) => [...cartItems, { product: product, type: type }])
  }

  const reset = () => {
    setCustomer(null);
    setCartItems([]);
  }

  const toolbarItems = (
    <React.Fragment>
      <ToolbarItem className='pf-u-text-align-right'>
        <Button variant="plain" aria-label="sync" onClick={() => { reset() }}>
          <TimesIcon /> Clear
        </Button>
      </ToolbarItem>
    </React.Fragment>
  );

  return <PageSection>
    <Toolbar
      className="pf-m-toggle-group-container"
      collapseListedFiltersBreakpoint="xl"
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>

    <Grid hasGutter>
      <GridItem span={7}>
        <ProductSearch apiClient={apiClient} product={product} setProduct={setProduct} addCartItem={addCartItem}></ProductSearch>
      </GridItem>
      <GridItem span={2}>
        <CustomerPane apiClient={apiClient} customer={customer} setCustomer={setCustomer}></CustomerPane>
      </GridItem>
      <GridItem span={3}>
        <Cart apiClient={apiClient} cartItems={cartItems} setCartItems={setCartItems} customerDiscount={customer ? customer.discount : 0}></Cart>
      </GridItem>
    </Grid>
  </PageSection>
}

export { Dashboard };
