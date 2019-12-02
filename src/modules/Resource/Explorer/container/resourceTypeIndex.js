import {createAR, createFR} from '../action';
import {createMR} from "../actions/MapResourceEditor.ts";
import FileResourceEditor from './FileResourceEditor';
import APIResourceEditor from './APIResourceEditor';
import MapResourceEditor from "./MapResourceEditor/index.ts";

export default [
  {type: '文件', action: createFR, editor: FileResourceEditor},
  {type: 'API', action: createAR, editor: APIResourceEditor},
  {type: '地图', action: createMR, editor: MapResourceEditor},
];
