import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import checkLogin from "./utils/checkLogin";

import {
  UniformDetailPage,
  UniformPage,
  BicycleDetailPage,
  BicyclesPage,
  LoginPage,
  SwimmingPoolTicketPage,
  SwimmingPoolInfoPage,
  ExplorePage,
  HomePage,
  JobDetailPage,
  JobPage,
  DrivingInstructionPage,
  DrivingRegisterPage,
  DrivingTestPage,
  CouponListPage,
  CouponPage,
  CouponScannedPage,
  PhotocopyDetailPage,
  PhotocopyPage,
  BookGuestHousePage,
  BookGuestHouseStatusPage,
  SwimmingPoolTourPage,
} from "./pages";

import NotFound from "./pages/NotFound";
import AppsPage from "./pages/AppsPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import AccountPage from "./pages/AccountPage";
import GuestHouseBillPage from "./pages/GuestHouseBillPage";
import GuestHouseInfoPage from "./pages/GuestHouseInfoPage";
import QrScanPage from "./pages/QrScanPage";
import SupportPage from "./pages/SupportPage";
import MaintainPage from "./pages/MaintainPage";
import drivingAdminPage from "./admin/DrivingAdminPage";
import BicycleAdminPage from "./admin/BicycleAdminPage";
import BankPage from "./pages/BankPage";
import BusSurveyPage from "./pages/BusSurveyPage";

class App extends React.Component {
  render() {
    checkLogin();

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/apps" component={AppsPage} />
          <Route exact path="/explore" component={ExplorePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/guest-house" component={GuestHouseInfoPage} />
          <Route
            exact
            path="/guest-house-bill"
            component={GuestHouseBillPage}
          />
          <Route
            exact
            path="/book-guest-house-room"
            component={BookGuestHousePage}
          />
          <Route
            exact
            path="/book-guest-house-status"
            component={BookGuestHouseStatusPage}
          />
          <Route exact path="/pool-info" component={SwimmingPoolInfoPage} />
          <Route exact path="/pool-ticket" component={SwimmingPoolTicketPage} />
          <Route exact path="/pool-tutor" component={SwimmingPoolTourPage} />
          <Route exact path="/qrscan" component={QrScanPage} />
          <Route
            exact
            path="/guest-house-info"
            component={GuestHouseInfoPage}
          />

          <Route exact path="/photocopies" component={PhotocopyPage} />
          <Route exact path="/photocopy" component={PhotocopyDetailPage} />

          <Route exact path="/driving-test" component={DrivingTestPage} />
          <Route
            exact
            path="/driving-registration"
            component={DrivingRegisterPage}
          />
          <Route
            exact
            path="/driving-instruction"
            component={DrivingInstructionPage}
          />

          <Route exact path="/jobs" component={JobPage} />
          <Route path="/job" component={JobDetailPage} />

          <Route exact path="/coupon-list" component={CouponListPage} />
          <Route exact path="/coupon" component={CouponPage} />
          <Route exact path="/coupon-scanned" component={CouponScannedPage} />

          <Route exact path="/bicycles" component={BicyclesPage} />
          <Route exact path="/bicycle" component={BicycleDetailPage} />

          <Route exact path="/bank" component={BankPage} />
          <Route exact path="/bus-survey" component={BusSurveyPage} />

          <Route exact path="/uniforms" component={UniformPage} />
          <Route exact path="/uniform" component={UniformDetailPage} />

          {/* admin */}
          <Route exact path="/driving-admin" component={drivingAdminPage} />
          <Route exact path="/bicycle-admin" component={BicycleAdminPage} />

          <Route exact path="/support" component={SupportPage} />
          <Route exact path="/maintain" component={MaintainPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
