/* module索引 */
export const secondaryModule = [
    ['demand/respond/:id', () => import('./Demand/Respond/container/index')],
];

export default {
    'system/role': () => import('./System/Role/container/index'),
    'system/menu': () => import('./System/Menu/container/index'),
    'system/user': () => import('./System/User/container/index'),
    'system/organization': () => import('./System/Org/container/index'),
    'task/waiting': () => import('./Task/Waiting/container/index'),
    'task/done': () => import('./Task/Done/container/index'),
    'task/rejected': () => import('./Task/Rejected/container/index'),
    'task/approve/:type/:id/:processid': () => import('./Task/Approve/container/index'),
    'task/scan/:type/:id/:processid': () => import('./Task/Approve/container/index'),
    'demand/center': () => import('./Demand/Center/container/index'),
    'demand/respond/:demandid': () => import('./Demand/Respond/container/index'),
    'demand/respond-list': () => import('./Demand/ResponseRecord/container/index'),
    'demand/publish-list': () => import('./Demand/PublishRecord/container/index'),
    'resource/mine': () => import('./Resource/Mine/container/index'),
    'resource/share-center': () => import('./Resource/ShareCenter/container/index'),
    'resource/approved': () => import('./Resource/Approved/container/index'),
    'resource/publish': () => import('./Resource/Publish/container/index'),
    'resource/publish/:ismodify/:taskid': () => import('./Resource/Publish/container/index'),
    'resource/request/:orgid': () => import('./Resource/Publish/container/index'),
    'resource/request-log': () => import('./Resource/RequestRecord/container/index'),
    'resource/publish-log': () => import('./Resource/PublishRecord/container/index'),
    'directory/publish-log': () => import('./Directory/PublishRecord/container/index'),
    'directory/mine': () => import('./Directory/Mine/container/index'),
};
