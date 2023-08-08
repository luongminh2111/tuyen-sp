import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListNoti, readNoti,
} from "../../Pages/actions/NotiActionCallApi";
import { CircularProgress } from "@material-ui/core";
import { getListMemberInWorkspace } from "../../Pages/components/ProjectSetting/actions/ProjectActionCallApi";

function NotificationPopup(props) {
  const { setShowNoti, count, setCount } = props;

  const account = useSelector((state) => state.auth.account);
  const members = useSelector((state) => state.staffs.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [ids, setIds] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    dispatch(getListMemberInWorkspace());
    dispatch(getListNoti(account?.id)).then((res) => {
      setLoading(false);
      setItems(res?.data);
    });
  }, []);

  useEffect(() => {
    dispatch(getListNoti(account?.id, filter)).then((res) => {
      setLoading(false);
      setItems(res?.data);
    });
  }, [filter]);

  const handleReadNoti = (item) => {
    if(item.read_at) {
      return;
    }
    if(ids?.includes(item.id)) return;
    setIds(ids?.concat(item.id));
    dispatch(readNoti(item.id)).then(res => {
      if(count > 0) {
        setCount(count - 1);
      }
    })
  };

  const getCurrentMember = (id) => {
    return members?.find((e) => e.id === id)?.name || "";
  };

  return (
    <div className="notification-wrapper">
      <div className="title d-flex justify-content-between">
        <div>Notification</div>
        <div className="d-flex content-2">
          <div className="sub-content-1" onClick={() => setFilter(!filter)}>
              <input type="checkbox" checked={filter} />
              <label> Unread only </label>
          </div>
          <div>
          <i class="fa-solid fa-x" onClick={() => setShowNoti(false)}></i>
          </div>
          
        </div>
      </div>
      <div className="list-noti">
        {loading ? (
          <div className="loading">
            <div>
              <CircularProgress />
            </div>
          </div>
        ) : (
          items?.map((e) => {
            return (
              <div className={`noti-item ${e?.read_at || ids?.includes(e?.id) ? "read" : ""} `} onClick={() => handleReadNoti(e)} >
                {/* <div className="top-content">
                  {getCurrentMember(e?.user_id)}
                </div> */}
                <div className="bot-content">{e?.content}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default NotificationPopup;
