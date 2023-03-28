import React from 'react';
import { Card, CardTitle, CardBody, CardFooter } from '@patternfly/react-core';

export const ProductCard: React.FunctionComponent = ({ product }) => {
    if (product.available.length > 0) {
        return product.available.map(item =>
            <Card className='ts--card' key={1}>
                <CardTitle>{product.name} ({product.manufacturer})</CardTitle>
                <CardBody>
                    Color: {item.color} <br />
                    Size: {item.size} <br />
                    Available: {item.quantity}
                </CardBody>
                <CardFooter className='ts--card--price'>${product.price} (+{product.taxRate}%) </CardFooter>
            </Card>
        )

    }
    else {
        return <Card className='ts--card ts--card--sold-out'>
            <CardTitle>{product.name} ({product.manufacturer})</CardTitle>
            <CardBody>
                <span className='ts--card--sold-out-text'>Sold out</span>
            </CardBody>
            <CardFooter className='ts--card--price'>${product.price} (+{product.taxRate}%) </CardFooter>
        </Card>
    }
};
