import { Routes, Route, Navigate } from "react-router-dom";
import Roadmap from "./pages/Roadmap/roadmap";
import FormModal from "./pages/Roadmap/components/AddRoadmapModal";
import InternList from "./pages/intern/components/InternList";
import MentorDetails from "./pages/mentors/MentorDetails";
import AddMentorDetails from "./pages/mentors/components/AddMentorDetails";
import InternForm from "./pages/intern/components/InternForm";
import BatchForm from "./pages/intern-batch/components/AddInternsBatchModal";
import InternsBatchTable from "./pages/intern-batch/components/InternsBatchTable";
import { useAuth0 } from "@auth0/auth0-react";
export default function Routing() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<Navigate to="/intern-batch" />} />
          <Route path="/intern-batch" element={<InternsBatchTable />} />
          <Route path="/intern-batch/batch/add/new" element={<BatchForm />} />
          <Route
            path="/intern-batch/edit-batch/:batchId"
            element={<BatchForm />}
          />
          <Route path="/intern-batch/:batchId" element={<InternList />} />
          <Route
            path="/intern-batch/:batchId/intern/add/new"
            element={<InternForm />}
          ></Route>
          <Route
            path="/intern-batch/:batchId/edit-intern/:id"
            element={<InternForm />}
          ></Route>
          <Route path="/mentors" element={<MentorDetails />} />
          <Route path="/mentor/add/new" element={<AddMentorDetails />} />
          <Route path="/edit-mentor/:id" element={<AddMentorDetails />} />
          <Route path="/roadmap" element={<Roadmap />}></Route>
          <Route path="/roadmap/add/new" element={<FormModal />}></Route>
          <Route path="/edit-roadmap/:id" element={<FormModal />}></Route>
        </Routes>
      )}
    </div>
  );
}
