import { actionType } from '../actionType/actionType';
export const counterInitialState = {
    counter: 0,
    countAmt :0,
    groupComp:0,
    bountyComp:0,
    homeComp:0

  };
  
  export const reRenderComReducer = (state = counterInitialState, action) => {
      console.log("check123",state)
    switch (action.type) {
        case actionType.RE_RENDER_COMPONENT:
            return { counter: state.counter + 1 };
        case actionType.RE_RENDER_USER_AMT:
            return { countAmt: state.countAmt + 1 };
        case actionType.RE_RENDER_GROUP_COMP:
            return { groupComp: state.groupComp + 1 };
        case actionType.RE_RENDER_BOUNTY_COMP:
            return { bountyComp: state.bountyComp + 1 };
        case actionType.RE_RENDER_HOME_COMP:
            return { homeComp: state.homeComp + 1 };

        default: return state;
    }

}