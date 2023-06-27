import React from "react";

function Category(props) {
  return (
    <div className="category-wrapper">
      <div className="category-label">Category</div>
      <div className="category-content">
        <div className="graph--bar -w-full">
          <div className="graph--bar-label">category 1</div>
          <div className="graph--bar__fig">
            <div className="graph--process"></div>
            <div className="graph--bar__numbers">0% closed</div>
          </div>
        </div>
        <div className="graph--bar -w-full">
          <div className="graph--bar-label">category 2</div>
          <div className="graph--bar__fig">
            <div className="graph--process"></div>
            <div className="graph--bar__numbers">0% closed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Category;
