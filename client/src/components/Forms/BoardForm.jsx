import React, { useState, useRef } from "react";
import { useAddBoardMutation } from "../../features/boardSlice/boardApiSlice";
import useToolTip from "../../customHooks/useToolTip";

const BoardForm = ({ theme, setLoading }) => {
  const [adding, setAdding] = useState(false);
  const [board, setBoard] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setPreviewImage] = useState(null);
  const [addBoard] = useAddBoardMutation();
  const formData = new FormData();
  const inputRef = useRef(null);
  const boardTitle = useRef(null);
  const children = (
    <svg
      onClick={() => inputRef.current.click()}
      width="25"
      height="25"
      viewBox="0 0 24 24"
      strokeWidth=".1"
      className="fill-stroke mr-1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2.5C9.76317 2.5 7.83928 3.83526 6.97989 5.75007C6.89728 5.93416 6.83874 6.06452 6.79362 6.15941C6.77129 6.20638 6.75451 6.23984 6.74168 6.26371C6.73213 6.28147 6.72703 6.28965 6.72588 6.29149C6.72575 6.29171 6.72567 6.29184 6.72564 6.29188C6.65664 6.38826 6.62018 6.41763 6.59892 6.4314C6.57756 6.44522 6.53559 6.46657 6.41833 6.49017C6.38281 6.49732 6.30904 6.5 6 6.5C4.067 6.5 2.5 8.067 2.5 10C2.5 11.933 4.067 13.5 6 13.5H6.67157L7.67157 12.5H6C4.61929 12.5 3.5 11.3807 3.5 10C3.5 8.61929 4.61929 7.5 6 7.5L6.05357 7.50003C6.27958 7.50021 6.46738 7.50035 6.61565 7.47051C6.79642 7.43413 6.97421 7.37969 7.1423 7.27088C7.3104 7.16208 7.43286 7.02216 7.54007 6.87214C7.59798 6.79112 7.64966 6.68782 7.69674 6.58881C7.74715 6.48277 7.81019 6.34231 7.88955 6.1655L7.88958 6.16542L7.89222 6.15954C8.59624 4.59089 10.1713 3.5 12 3.5C13.8287 3.5 15.4038 4.59089 16.1078 6.15954L16.1105 6.16566C16.1898 6.3424 16.2529 6.4828 16.3033 6.58881C16.3503 6.68782 16.402 6.79112 16.4599 6.87214C16.5671 7.02216 16.6896 7.16208 16.8577 7.27088C17.0258 7.37969 17.2036 7.43413 17.3844 7.47051C17.5326 7.50035 17.7204 7.50021 17.9464 7.50003L18 7.5C19.3807 7.5 20.5 8.61929 20.5 10C20.5 11.3807 19.3807 12.5 18 12.5H16.3284L17.3284 13.5H18C19.933 13.5 21.5 11.933 21.5 10C21.5 8.067 19.933 6.5 18 6.5C17.691 6.5 17.6172 6.49732 17.5817 6.49017C17.4644 6.46657 17.4224 6.44522 17.4011 6.4314C17.3798 6.41763 17.3434 6.38826 17.2744 6.29188L17.2741 6.2915C17.273 6.28968 17.2679 6.2815 17.2583 6.26371C17.2455 6.23984 17.2287 6.20638 17.2064 6.15941C17.1613 6.06452 17.1027 5.93416 17.0201 5.75007C16.1607 3.83526 14.2368 2.5 12 2.5Z"
      />
      <path d="M12 12L11.6464 11.6464L12 11.2929L12.3536 11.6464L12 12ZM12.5 21C12.5 21.2761 12.2761 21.5 12 21.5C11.7239 21.5 11.5 21.2761 11.5 21L12.5 21ZM7.64645 15.6464L11.6464 11.6464L12.3536 12.3536L8.35355 16.3536L7.64645 15.6464ZM12.3536 11.6464L16.3536 15.6464L15.6464 16.3536L11.6464 12.3536L12.3536 11.6464ZM12.5 12L12.5 21L11.5 21L11.5 12L12.5 12Z" />
    </svg>
  );
  const { uploadImage } = useToolTip({
    content: "Upload photo",
    children: children,
  });

  const handleAdd = async (e) => {
    if (e.key === "Enter" && board !== "") {
      formData.append("title", board);
      formData.append("background", image);
      setBoard("");
      setAdding(false);
      setPreviewImage();
      setImage();
      setLoading(true);
      await addBoard(formData);
      setLoading(false);
    }
  };

  const handleImage = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
    if (boardTitle.current) {
      boardTitle.current.focus();
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setPreviewImage();
    setImage();
    setAdding(false);
    setBoard("");
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <div
        onClick={() => setAdding(true)}
        className={`border-2 border-border bg-backgroundTertiary hover:bg-backgroundPrimary rounded-[10px] h-[218px] flex justify-center items-center cursor-pointer`}
        style={{
          backgroundImage: imagePreview && `url(${imagePreview})`,
          backgroundSize: "cover",
        }}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill="none"
          className={`stroke-stroke ${adding && "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 6L12 18" strokeLinecap="round" />
          <path d="M18 12L6 12" strokeLinecap="round" />
        </svg>
        {adding && (
          <div
            className={`${
              theme === "Dark" ? "bg-800" : "bg-white"
            } shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[10px] p-[15px] mb-4 flex items-center`}
          >
            <input
              autoFocus
              ref={boardTitle}
              value={board}
              type="text"
              name="column"
              placeholder="Board name"
              className="outline-none bg-transparent w-[150px]"
              onKeyUp={handleAdd}
              onChange={(e) => setBoard(e.target.value)}
            />
            {uploadImage}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.5"
              className="stroke-stroke"
              onClick={handleCancel}
            >
              <path
                d="M18 6L6 18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              name="background"
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleImage}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default BoardForm;
