import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const InternListComponent = lazy(() =>
  import("./pages/intern/components/InternList")
);

const AppRouting = () => {
  // let navigate = useNavigate();
  // const location = useLocation();
  return (
    <Suspense fallback={<p>loading</p>}>
      <Routes>
        <Route path="/" element={<InternListComponent />} />
        {/* <Route
            path="/edit/:id"
            element={
              <InternListComponent navigate={navigate} location={location} />
            }
          /> */}
      </Routes>
    </Suspense>
  );
};
export default AppRouting;
