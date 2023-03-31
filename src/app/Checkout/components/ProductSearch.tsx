import * as React from 'react';
import { SearchInput, Alert, Gallery, Title } from '@patternfly/react-core';
import { ProductCard } from './ProductCard';

const ProductSearch: React.FunctionComponent = ({ apiClient, title, allShops = false, product, setProduct, addCartItem, disabled = false, reset }) => {

    const [productId, setProductId] = React.useState('');
    const [error, setError] = React.useState<Response | null>(null);

    React.useEffect(() => {
        setProduct(null);
        setProductId('');
    }, [reset])

    const onChange = (productId: string) => {
        setProductId(productId);
    };

    const search = async () => {
        setError(null);
        setProduct(null);

        apiClient.getProduct(productId, allShops)
            .then((product) => setProduct(product))
            .catch((error) => setError(error));
    }

    return (
        <>
            <Title headingLevel="h1" size="lg">{title}</Title>
            <SearchInput
                isDisabled={disabled}
                placeholder="Scan products"
                value={productId}
                onChange={(value, _event) => onChange(value)}
                onSearch={(value, _event) => search()}
                onClear={() => onChange('')}
            />
            {error && <Alert variant="danger" title={error.statusText} />}

            <Gallery className='ts--card-gallery' hasGutter>
                {product && <ProductCard product={product} addCartItem={addCartItem} allShops={allShops} />}
            </Gallery>
        </>
    );
}

export { ProductSearch };
