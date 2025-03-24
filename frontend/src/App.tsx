import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddActivity from "./pages/AddActivity";
import { useAppContext } from "./contexts/AppContext";
import MyActivities from "./pages/MyActivities";
import EditActivity from "./pages/EditActivity";
import Search from "./pages/Search";
import Details from "./pages/Details";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/details/:activityId"
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-activity"
              element={
                <Layout>
                  <AddActivity />
                </Layout>
              }
            />
            <Route
              path="/my-activities"
              element={
                <Layout>
                  <MyActivities />
                </Layout>
              }
            />
            <Route
              path="/edit-activity/:activityId"
              element={
                <Layout>
                  <EditActivity />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
