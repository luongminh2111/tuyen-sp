import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Milestones(props) {
  const { mileCount } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (mileCount) {
      const result1 = Object.entries(mileCount);
      setResult(result1);
    }
  }, [mileCount]);

  return (
    <div className="milestone-wrapper">
      <div className="milestone-label">Milestone</div>
      {!mileCount ? (
        <div
          style={{
            width: "100%",
            height: "250px",
            backgroundColor: "#FFF",
            border: "1px solid #d3d5d7",
            borderRadius: "4px",
          }}
        >
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ fontSize: "16px", marginTop: "30px", fontWeight: "500" }}
          >
            Milestone is empty
          </div>
        </div>
      ) : (
        <>
          {result?.map((e, index) => {
            let total =
              e?.[1]?.Open +
              e?.[1]?.In_Progress +
              e?.[1]?.Resolved +
              e?.[1]?.Closed;
            return (
              <div className="milestone-content" key={index}>
                <div className="graph--bar -w-full">
                  <div className="graph--bar-label">{e?.[0]}</div>
                  <div className="graph--bar__fig">
                    <div
                      className="graph--process"
                      style={{
                        width: "calc(100% - 120px)",
                        height: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "nowrap",
                      }}
                    >
                      {total === 0 ? (
                        <div
                          style={{
                            backgroundColor: "#ed8077",
                            width: `calc(100%)`,
                          }}
                        ></div>
                      ) : (
                        <>
                          <div
                            style={{
                              backgroundColor: "#ed8077",
                              width: `calc(100% * ${
                                e?.[1]?.Open || 0
                              } / ${total} )`,
                            }}
                          ></div>
                          <div
                            style={{
                              backgroundColor: "#4488c5",
                              width: `calc(100% * ${
                                e?.[1]?.In_Progress || 0
                              } /${total} )`,
                            }}
                          ></div>
                          <div
                            style={{
                              backgroundColor: "#5eb5a6",
                              width: `calc(100% * ${
                                e?.[1]?.Resolved || 0
                              } /${total} )`,
                            }}
                          ></div>
                          <div
                            style={{
                              backgroundColor: "#a1af2f",
                              width: `calc(100% * ${
                                e?.[1]?.Closed || 0
                              } /${total} )`,
                            }}
                          ></div>
                        </>
                      )}
                    </div>
                    <div className="graph--bar__numbers">
                      {total === 0 ? total : Math.ceil(e?.[1]?.Closed / total * 100)}%
                      closed
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
export default Milestones;
