// https://www.cluemediator.com/create-simple-popup-in-reactjs
const CreateGameModal = (props) => {
  return (
    <div
      className={"fixed w-full h-screen bg-[#00000050] top-0 left-0"}
      onClick={props.handleClose}
    >
      <div
        className={"relative w-8/12 h-auto mt-24 bg-white m-auto rounded"}
        onClick={(e) => e.stopPropagation()}
      >
        {props.content}
      </div>
    </div>
  );
};

export default CreateGameModal;
