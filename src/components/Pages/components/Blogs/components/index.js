import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import "../styles/index.scss";
import { useDispatch } from "react-redux";
import { getListBlog } from "../actions/BlogActionCallApi";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import { useHistory } from "react-router-dom";

function Blog(props) {
  const [listBlog, setListBlog] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getListBlog()).then((res) => setListBlog(res));
  }, []);

  const handleShowDetail = (id) => {
    history.push(`/blog/detail/${id}`)
  }

  console.log("check list :", listBlog);
  return (
    <div className="blog-wrapper">
      <HeaderNav />
      <div className="list-content">
        <div className="blogs">
          {listBlog?.map((e, index) => {
            return (
              <div key={index} className="blog-item" onClick={() => handleShowDetail(e?.id)}>
                <div className="image">
                  <img src={e?.image} />
                </div>
                <div className="title">{e?.title}</div>
                <div className="description">{e?.description}</div>
              </div>
            );
          })}
        </div>
        <div className="filters"></div>
      </div>
    </div>
  );
}
export default Blog;
