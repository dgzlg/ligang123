import Main from './Main/reducer';
import FileUpload from './common/FileUpload/reducer';
import MyMessage from './MyMessage/reducer';
import Home from './Home/reducer';
import System_Role from './System/Role/reducer';
import System_Menu from './System/Menu/reducer';
import System_User from './System/User/reducer';
import System_Org from './System/Org/reducer';
import Task_Waiting from './Task/Waiting/reducer';
import Task_Done from './Task/Done/reducer';
import TaskRejected from './Task/Rejected/reducer';
import TaskApprove from './Task/Approve/reducer';
import Demand_Center from './Demand/Center/reducer';
import Demand_Res_Record from './Demand/ResponseRecord/reducer';
import Demand_Pub_Record from './Demand/PublishRecord/reducer';
import Resource_Req_Record from './Resource/RequestRecord/reducer';
import Resource_Pub_Record from './Resource/PublishRecord/reducer';
import Directory_Pub_Record from './Directory/PublishRecord/reducer';
import DirectoryMine from './Directory/Mine/reducer';
import ShareCenter from './Resource/ShareCenter/reducer';
import ResourceApproved from './Resource/Approved/reducer';
import ResourceCollector from './Resource/Collector/reducer';
import ResourceExplorer from './Resource/Explorer/reducer';

export default {
    Main,
    FileUpload,
    MyMessage,
    Home,
    System_Role,
    System_Menu,
    System_User,
    System_Org,
    Task_Waiting,
    Task_Done,
    TaskApprove,
    TaskRejected,
    Demand_Center,
    Demand_Res_Record,
    Demand_Pub_Record,
    Resource_Req_Record,
    Resource_Pub_Record,
    Directory_Pub_Record,
    DirectoryMine,
    ShareCenter,
    ResourceExplorer,
    ResourceCollector,
    ResourceApproved,
};
