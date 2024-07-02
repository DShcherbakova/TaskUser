import { useState, useRef, FC, RefObject } from "react";
import { ITask } from "./TaskList";


interface IProps {
  task: ITask,
  deleteTask: () => void,
  editTask: (i: number, updatedTask: ITask) => void,
  index: number
}

const Task: FC<IProps> = ({
  task: { title, isCompleted, updatedAt },
  deleteTask,
  editTask,
  index,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const textRef: RefObject<HTMLTextAreaElement> = useRef(null); // { current: document.getElementById() }

  const handleClickSave = () => {
    if (textRef.current) {
      editTask(index, {
      title: textRef.current.value,
      isCompleted,
      updatedAt: new Date().toISOString(),
    });
    setIsEdit(false);
    }
    
  };

  return (
    <div
      className={`card mb-3 ${isCompleted ? "bg-light" : ""}`}
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      <div className="card-body">
        {isEdit ? (
          <div>
            <textarea
              ref={textRef}
              defaultValue={title}
              className="form-control mb-2"
            ></textarea>
            <button
              onClick={handleClickSave}
              className="btn btn-success btn-sm me-2"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <p
              className={`mb-0 ${
                isCompleted ? "text-decoration-line-through text-muted" : ""
              }`}
              style={{ flexGrow: 1 }}
            >
              {title}
            </p>
            <small className="text-muted me-5">
              Updated on: {new Date(updatedAt).toLocaleString()}
            </small>
            <input
              checked={isCompleted}
              onChange={() =>
                editTask(index, {
                  title,
                  isCompleted: !isCompleted,
                  updatedAt: new Date().toISOString(),
                })
              }
              type="checkbox"
              className="form-check-input me-2"
            />
            <button
              onClick={() => setIsEdit(true)}
              className="btn btn-warning btn-sm me-2"
            >
              Edit
            </button>
            <button onClick={deleteTask} className="btn btn-danger btn-sm">
              Del
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;

// /* eslint-disable react/prop-types */
// import { useState, useRef } from "react";

// const Task = ({
//   task: { title, isCompleted, updatedAt },
//   deleteTask,
//   editTask,
//   index,
// }) => {
//   const [isEdit, setIsEdit] = useState(false);
//   const textRef = useRef(); // { current: document.getElementById() }

//   const handleClickSave = () => {
//     editTask(index, {
//       title: textRef.current.value,
//       isCompleted,
//       updatedAt: new Date().toISOString(),
//     });
//     setIsEdit(false);
//   };

//   return (
//     <div
//       className={`card mb-3 ${isCompleted ? "bg-light" : ""}`}
//       style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
//     >
//       <div className="card-body">
//         {isEdit ? (
//           <div>
//             <textarea
//               ref={textRef}
//               defaultValue={title}
//               className="form-control mb-2"
//             ></textarea>
//             <button
//               onClick={handleClickSave}
//               className="btn btn-success btn-sm me-2"
//             >
//               Save
//             </button>
//           </div>
//         ) : (
//           <div className="d-flex align-items-center">
//             <p
//               className={`mb-0 ${
//                 isCompleted ? "text-decoration-line-through text-muted" : ""
//               }`}
//               style={{ flexGrow: 1 }}
//             >
//               {title}
//             </p>
//             <small className="text-muted me-5">Updated on: {new Date(updatedAt).toLocaleString()}</small>
//             <input
//               checked={isCompleted}
//               onChange={() =>
//                 editTask(index, { title, isCompleted: !isCompleted, updatedAt: new Date().toISOString() })
//               }
//               type="checkbox"
//               className="form-check-input me-2"
//             />
//             <button
//               onClick={() => setIsEdit(true)}
//               className="btn btn-warning btn-sm me-2"
//             >
//               Edit
//             </button>
//             <button onClick={deleteTask} className="btn btn-danger btn-sm">
//               Del
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Task;
