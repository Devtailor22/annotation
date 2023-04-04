import TableComonent from "./TableComponent";
//import SwipeableTemporaryDrawer from "./Sidebar";
const tableHeadCol_enum = [
  "Id",
  "First Name",
  "Last Name",
  "Image",
  "Action",
  "WorkArea",
];
function Home() {
  return (
    <>
      <TableComonent tableHeadCol_enum={tableHeadCol_enum} />
    </>
  );
}

export default Home;
