import * as React from 'react';
import { Button, Grid, GridItem, PageSection, Title, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { ProductSearch } from './components/ProductSearch';
import { Cart } from './components/Cart';
import { PosApi, Configuration } from '@app/api';
import { CustomerPane } from './components/CustomerPane';
import { TimesIcon, TrashIcon } from '@patternfly/react-icons';

const Dashboard: React.FunctionComponent = () => {
  const [reset, doReset] = React.useState(0);
  const [product, setProduct] = React.useState();
  const [cartItems, setCartItems] = React.useState([]);
  const [customer, setCustomer] = React.useState();

  const configuration = new Configuration({ basePath: 'http://localhost:8080' })
  const apiClient = new PosApi(configuration);

  const addCartItem = (product, type) => {
    setCartItems((cartItems) => [...cartItems, { product: product, type: type }])
  }

  const toolbarItems = (
    <React.Fragment>
      <ToolbarItem className='pf-u-text-align-right'>
        <Button variant="plain" aria-label="sync" onClick={() => { doReset(prev => prev + 1) }}>
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
        <ProductSearch apiClient={apiClient} product={product} setProduct={setProduct} addCartItem={addCartItem} reset={reset}></ProductSearch>
      </GridItem>
      <GridItem span={2}>
        <CustomerPane apiClient={apiClient} customer={customer} setCustomer={setCustomer} reset={reset}></CustomerPane>
      </GridItem>
      <GridItem span={3}>
        <Cart apiClient={apiClient} cartItems={cartItems} setCartItems={setCartItems} customer={customer} reset={reset}></Cart>
      </GridItem>
    </Grid>
  </PageSection>
}

export { Dashboard };
