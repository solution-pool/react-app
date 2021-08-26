import { combineReducers } from 'redux';
import {loginReducer} from '../reducers/loginReducer';
import {signupReducer} from '../reducers/signupReducer';
import {uploadImages} from '../reducers/uploadImages';
import {reRenderComReducer} from '../reducers/reRenderComReducer';
import {pushNotificationReducer} from '../reducers/pushNotificationReducer';
import {sendFriendRequestReducer} from '../reducers/sendFriendRequestReducer';
import {cancelFriendRequestReducer} from "../reducers/cancelFriendRequestReducer";
import {aboutReducer} from "../reducers/aboutReducer";
import {closeFormReducer} from "../reducers/closeFormReducer";
import {postCommunityReducer} from "../reducers/postCommunityReducer";
import {postCommunNameReducer} from "../reducers/postCommunNameReducer";
import {totalDraftReducer} from "../reducers/totalDraftReducer";
import { filterPostReducer } from "../reducers/filterPostReducer";
import { userFlagReducer } from "../reducers/userFlagReducer";
import { accordionReducer } from "../reducers/accordionReducer";
import { userAmtReducer } from "../reducers/userAmtReducer";
import {groupReducer} from "../reducers/groupReducer";
import {sharePostReducer} from  "../reducers/sharePostReducer";
import {advancePostShareSettingReducer} from "../reducers/advancePostShareSettingReducer";
export const rootReducer = combineReducers({
    loginReducer,
    signupReducer,
    uploadImages,
    reRenderComReducer,
    pushNotificationReducer,
    sendFriendRequestReducer,
    cancelFriendRequestReducer,
    aboutReducer,
    closeFormReducer,
    postCommunityReducer,
    postCommunNameReducer,
    totalDraftReducer,
    filterPostReducer,
    userFlagReducer,
    accordionReducer,
    userAmtReducer,
    groupReducer,
    sharePostReducer,
    advPostShareSetting : advancePostShareSettingReducer
  })
