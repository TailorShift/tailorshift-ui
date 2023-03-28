import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { ProductSearch } from './components/ProductSearch';
import { Cart } from './components/Cart';
import { PosApi, Configuration } from '@app/api';

const Dashboard: React.FunctionComponent = () => {
  const [product, setProduct] = React.useState();

  const configuration = new Configuration({ basePath: 'http://localhost:8080' })
  const apiClient = new PosApi(configuration);


  return <PageSection>
    <Title headingLevel="h1" size="lg">Add products</Title>
    <ProductSearch apiClient={apiClient} product={product} setProduct={setProduct}></ProductSearch>

    <Cart></Cart>
  </PageSection>
}

export { Dashboard };
