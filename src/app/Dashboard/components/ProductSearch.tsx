import * as React from 'react';
import { SearchInput, Alert, Gallery } from '@patternfly/react-core';
import { ProductCard } from './ProductCard';

const ProductSearch: React.FunctionComponent = ({ apiClient, product, setProduct }) => {
    const BASE_URL = 'http://localhost:8080';
    const [productId, setProductId] = React.useState('');
    const [error, setError] = React.useState<Response | null>(null);

    const onChange = (productId: string) => {
        setProductId(productId);
    };

    const search = async () => {
        setError(null);
        setProduct(null);

        apiClient.getProduct(productId)
            .then((product) => setProduct(product))
            .catch((error) => setError(error));
    }

    return (
        <>
            <SearchInput
                placeholder="Find by ID"
                value={productId}
                onChange={(value, _event) => onChange(value)}
                onSearch={(value, _event) => search()}
                onClear={() => onChange('')}
            />
            {error && <Alert variant="danger" title={error.statusText} />}

            <Gallery hasGutter>
                {product && <ProductCard product={product} />}
            </Gallery>
        </>
    );
}

export { ProductSearch };
