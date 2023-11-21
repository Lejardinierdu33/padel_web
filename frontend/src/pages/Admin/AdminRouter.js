import React from "react";
import { Route, Routes } from "react-router-dom";

// Import Admin Dashboard
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";

// Import Admin User
import AUser from "./Users/AUser";
import AUserEdit from "./Users/AUserEdit";
import AUserAdd from "./Users/AUserAdd";

// Import Error
import Error from "../../_utils/Error/Error";

// Import Matchs
import AMatch from "./Match/AMatch";
import AMatchEdit from "./Match/AMatchEdit";
import AMatchAdd from "./Match/AMatchAdd";

// Import Terrains
import ATerrain from "./Terrain/ATerrain";
import ATerrainEdit from "./Terrain/ATerrainEdit";
import ATerrainAdd from "./Terrain/ATerrainAdd";

// Import Mail
import AMail from "./Mail/AMail";

// Import Newsletter
import ANewsletter from "./Newsletter/ANewsletter";

export default function AdminRouter() {
  return (
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Route Users */}
          <Route path="users">
            <Route path="index" element={<AUser />} />
            <Route path="edit/:id" element={<AUserEdit />} />
            <Route path="add" element={<AUserAdd />} />
          </Route>

          {/* Route Matchs */}
          <Route path="matchs">
            <Route path="index" element={<AMatch />} />
            <Route path="edit/:id" element={<AMatchEdit />} />
            <Route path="add" element={<AMatchAdd />} />
          </Route>

          {/* Route Terrains */}
          <Route path="terrains">
            <Route path="index" element={<ATerrain />} />
            <Route path="edit/:id" element={<ATerrainEdit />} />
            <Route path="add" element={<ATerrainAdd />} />
          </Route>

          {/* Route Mail */}
          <Route path="contact" >
            <Route path="index" element={<AMail />} />
          </Route>

          { /* Route Newsletter */}
          <Route path="newsletter">
            <Route path="index" element={<ANewsletter />} />
          </Route>

          
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
  );
}
