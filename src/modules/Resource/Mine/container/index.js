import React from 'react';
import {BlockPage} from '../../../common/Page';
import ResourceExplorer from '../../Explorer/container/index';
import './index.less';

const ResourceMine = () => {
  return (
    <BlockPage>
      <ResourceExplorer
        editable={true}
        draggable={false}
      />
    </BlockPage>
  );
};

ResourceMine.propTypes = {};

export default ResourceMine;
