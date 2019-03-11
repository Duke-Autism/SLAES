
import Calendar from "./views/Calendar.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Login from "./views/pages/Login.jsx";
import ReactTables from "./views/tables/ReactTables.jsx";
import Wizard from "./views/forms/Wizard.jsx";
import Charts from "./views/Charts.jsx"

const routes = [{
   collapse: true,
   name: "Home",
   icon: "nc-icon nc-bank",
   state: "formsCollapse",
   views: [
     {
   path: "/dashboard",
   name: "Dashboard",
   mini: "MP",
   component: Dashboard,
   layout: "/admin"
     },
     {
   path: "/wizard",
   name: "Add new study",
   mini: "NS",
   component: Wizard,
   layout: "/admin"
     },
    ]
  },
  {
    collapse: true,
    name: "Exports & Reports",
    icon: "nc-icon nc-single-copy-04",
    state: "pagesCollapse",
    views: [
      {
        path: "/charts",
        name: "Charts and Stats",
        mini: "CS",
        component: Charts,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "Export into RedCAP",
        mini: "RC",
        component: Wizard,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "nc-icon nc-calendar-60",
    component: Calendar,
    layout: "/admin"
  }
]

;

export default routes;
