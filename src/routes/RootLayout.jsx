import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../componants/layout/NavBar";
import Spinner from "../componants/UI/Spinner";

const RootLayout = () => {
  // shows spinner if i use loader to fetch data
  // const navigation = useNavigation()
  // const isLoading = navigation.state === 'loading'
  return (
    <div>
      <NavBar />
      <div>
        {/* {isLoading && <Spinner /> } */}
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
