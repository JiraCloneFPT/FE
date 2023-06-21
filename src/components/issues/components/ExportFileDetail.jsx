import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

const items = [
  {
    label: "Word",
    key: "1",
  },
];

export default function ExportFileDetail() {
  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Dropdown menu={menuProps}>
        <Button type="default" style={{ backgroundColor: "#ECEDF0" }}>
          <Space>
            Export
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );
}
