import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const menus = [
    { path: "/", name: "Home" },
    { path: "/osm", name: "OSM 맵" },
    { path: "/vworld", name: "VWorld 맵" },
    { path: "/show-map-info", name: "맵 정보 추출" },
    { path: "/change-map-object", name: "지도 객체 변경" },
    { path: "/advanced-map", name: "고도화" },
  ];

  return (
    <>
      <nav>
        <ul>
          {menus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.path} className={({ isActive }) => (isActive ? "active" : "")}>
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <section className="page">
        <Outlet />
      </section>
    </>
  );
};

export default Layout;
