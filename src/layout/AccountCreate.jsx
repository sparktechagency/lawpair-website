import Header from "../components/shared/header/Header";

const AccountCreate = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="min-h-screen pt-32">{children}</main>
    </div>
  );
};

export default AccountCreate;
