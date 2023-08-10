import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";

export const getTaskStatusCount = () => (dispatch, getState) =>  {
  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();
  const url = `${BASE_URL}/api/project/${id}/task_status_count`;
  const options = {
    method: 'GET',
    mode: 'cors'
  }

  return callApi(url, options).then(res => {
    return res?.data?.task_status_counts;
  })
};

export const getMilestoneStatusCount = () => (dispatch, getState) =>  {
  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();
  const url = `${BASE_URL}/api/project/${id}/task_milestone_status_count`;
  const options = {
    method: 'GET',
    mode: 'cors'
  }

  return callApi(url, options).then(res => {
    return res?.data?.milestone_task_status_counts;
  })
}