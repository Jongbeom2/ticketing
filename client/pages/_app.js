import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/buildClient";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/current-user");
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(
        appContext.ctx,
        client,
        data.currentUser
      )
    : {};
  return {
    pageProps,
    ...data,
  };
};
export default AppComponent;
