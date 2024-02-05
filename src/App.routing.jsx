import { Routes, Route } from "react-router";
import Roadmap from "./pages/Roadmap/roadmap";
import FormModal from "./pages/Roadmap/components/AddRoadmapModal";
import InternList from "./pages/intern/components/InternList";
import MentorDetails from "./pages/mentors/MentorDetails";
import AddMentorDetails from "./pages/mentors/components/AddMentorDetails"
export default function Routing() {
  return (
    <Routes>
      <Route path="/intern" element={<InternList/>} />
      <Route path="/mentors" element={<MentorDetails/>} />
      <Route path="/mentor/add/new" element={<AddMentorDetails/>} />
      <Route path="/edit-mentor/:id" element={<AddMentorDetails/>} />
      <Route path="/roadmap" element={<Roadmap />}></Route>
      <Route path="/roadmap/add/new" element={<FormModal />}></Route>
      <Route path="/edit-roadmap/:id" element={<FormModal />}></Route>
    </Routes>
  );
}
