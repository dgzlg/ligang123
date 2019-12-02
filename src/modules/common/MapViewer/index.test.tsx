import * as React from 'react';
import {render, waitForElement} from '@testing-library/react';
import MapViewer from './index';

it('MapViewer', async () => {
    const {getByText} = render(<MapViewer width={200} height={100} type={'wms'}/>);

    await waitForElement(() => getByText(/Width: 200/i));
    await waitForElement(() => getByText(/Height: 100/i));
    await waitForElement(() => getByText(/Type: wms/i));
});