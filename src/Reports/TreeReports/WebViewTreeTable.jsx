export const WebReportTableTree = ({ item }) => {
  return (
    <>
      {/* <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
      </tr>
      {item.children && item.children.length > 0 && (
        <tr>
          <td colSpan="2">
            <table>
              <tbody>
                {item.children.map(child => (
                  <WebReportTableTree key={child.id} item={child} />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )} */}
    </>
  );
};