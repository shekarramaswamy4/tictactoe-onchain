const InstallWallet = () => {
  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <p className={"text-lg"}>
        Oh shoot! It looks like you don't have a wallet yet.
      </p>
      <p className={"text-lg"}>
        Install one like{" "}
        <a className={"underline"} href={"https://metamask.io/"}>
          Metamask
        </a>{" "}
        and come back!
      </p>
    </div>
  );
};

export default InstallWallet;
