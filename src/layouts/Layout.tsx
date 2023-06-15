import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const menus = [
    { path: "/osm", name: "OSM 맵" },
    { path: "/vworld", name: "VWorld 맵" },
    { path: "/map-info", name: "맵 정보 표시" },
    { path: "/geo-location", name: "사용지 위치 이동" },
    { path: "/geo-location-with-marker", name: "사용지 위치 표시" },
    { path: "/wfs", name: "WFS로 객체 표시" },
    { path: "/wms", name: "WMS로 객체 표시" },
    { path: "/feature-click", name: "객체 상호작용 추가" },
    { path: "/wms-popup", name: "WMS에 팝업 부착" },
    { path: "/transaction-insert", name: "WFS Transaction으로 데이터 추가" },
    { path: "/transaction-update", name: "WFS Transaction으로 데이터 수정" },
    { path: "/transaction-delete", name: "WFS Transaction으로 데이터 삭제" },
    { path: "/cluster-map", name: "Cluster Map 표현" },
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
