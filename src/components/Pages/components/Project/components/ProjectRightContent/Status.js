import React, { useMemo } from "react";

function Status(props) {
  const { statusCount } = props;
  const total = useMemo(() => {
    return (
      statusCount?.Open +
      statusCount?.In_Progress +
      statusCount?.Resolved +
      statusCount?.Closed
    );
  }, [statusCount]);

  const openValue = useMemo(() => {
    return statusCount?.Open;
  }, [statusCount]);

  const progressValue = useMemo(() => {
    return statusCount?.In_Progress;
  }, [statusCount]);

  const resolveValue = useMemo(() => {
    return statusCount?.Resolved;
  }, [statusCount]);

  const closeValue = useMemo(() => {
    return statusCount?.Closed;
  }, [statusCount]);

  return (
    <div className="status-wrapper">
      <div className="status-label">Status</div>
      <div className="status-content">
        <div className="graph--bar -w-full">
          <div className="graph--bar__fig">
            {total === 0 ? (
              <div
                style={{
                  backgroundColor: "#ed8077",
                  width: `calc(100%)`,
                }}
              ></div>
            ) : (
              <div className="graph--process">
                <div
                  style={{
                    backgroundColor: "#ed8077",
                    width: `calc(100% * ${openValue || 0} / ${total} )`,
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#4488c5",
                    width: `calc(100% * ${progressValue || 0} /${total} )`,
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#5eb5a6",
                    width: `calc(100% * ${resolveValue || 0} /${total} )`,
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#a1af2f",
                    width: `calc(100% * ${closeValue || 0} /${total} )`,
                  }}
                ></div>
              </div>
            )}
            <div className="graph--bar__numbers">
              {Math.ceil(closeValue / total * 100)}% closed
            </div>
          </div>
        </div>
        <div className="graph--bar__info">
          <div className="graph--bar__info-wrapper open">
            <div className="label">Open</div>
            <div className="graph--bar__info-number">
              <p>{statusCount?.Open || 0}</p>
            </div>
          </div>
          <div className="graph--bar__info-wrapper in-progress">
            <div className="label">In Progress</div>
            <div className="graph--bar__info-number">
              <p>{statusCount?.In_Progress || 0}</p>
            </div>
          </div>
          <div className="graph--bar__info-wrapper resolved">
            <div className="label">Resolved</div>
            <div className="graph--bar__info-number">
              <p>{statusCount?.Resolved}</p>
            </div>
          </div>
          <div className="graph--bar__info-wrapper closed">
            <div className="label">Closed</div>
            <div className="graph--bar__info-number">
              {" "}
              <p>{statusCount?.Closed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Status;
