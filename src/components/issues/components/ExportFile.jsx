import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ExportFileService } from "../../../services/ExportService";
const items = [
    {
        label: "Excel",
        key: "excel",
    },
    {
        label: "HTML",
        key: "html",
    },
    {
        label: "Word",
        key: "word",
    },
];

export default function ExportFile() {
    const { data } = useContext(UserContext);
    const handleMenuClick = async (e) => {
        if (e.key !== "word") {
            const result = await ExportFileService(data, e.key);
            const blobURL = URL.createObjectURL(new Blob([result]));
            const a = document.createElement("a");
            a.href = blobURL;
            a.download = `${new Date()}${
                e.key === "excel" ? ".xlsx" : ".html"
            }`;
            a.click();
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                        Export
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </>
    );
}
